// HealthyLife server: serves the website and forwards chat messages to Google Gemini.
// The API key stays here on the server and is never sent to the browser.
// Run with:  node server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

// ---- Load .env (no extra packages needed) ----
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#")) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, "");
  }
}

const PORT = process.env.PORT || 5500;
const API_KEY = process.env.GEMINI_API_KEY;
// One or more models, comma-separated. If one is busy, the next one is tried.
const MODELS = (process.env.GEMINI_MODEL || "gemini-3.5-flash-lite,gemini-3.1-flash-lite,gemini-3.8-flash")
  .split(",").map(s => s.trim()).filter(Boolean);
const MODEL = MODELS[0];

const SYSTEM_PROMPT = `You are HealthBot, a friendly wellness assistant on the HealthyLife website.
- Only help with health and wellness topics: nutrition, diet, weight, exercise, sleep, stress, mental wellbeing, hydration, common mild symptoms, healthy habits and BMI. Politely decline unrelated topics and steer back to health.
- Give general, evidence-based information. Never diagnose, and never prescribe or give exact medication doses beyond "follow the label".
- Recommend seeing a doctor when symptoms are serious, persistent or unclear. For emergencies (chest pain, trouble breathing, stroke signs, self-harm thoughts) tell the user to call emergency services immediately (112 in Indonesia/Europe, 911 in the US).
- Keep answers short (under 150 words), warm and practical. You may use a few emojis.
- Write in plain text: use "•" for bullet points and NO markdown (no **, #, or tables).
- Reply in the same language the user writes in (for example Bahasa Indonesia or English).`;

const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const PUBLIC_FILES = new Set(["/index.html", "/style.css", "/chatbot.js", "/main.js"]);

function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Convert the page's chat history into Gemini's format (must start with the user and alternate roles).
function toGeminiContents(messages) {
  const contents = [];
  for (const m of messages.slice(-20)) {
    if (typeof m?.text !== "string" || !m.text.trim()) continue;
    const role = m.from === "user" ? "user" : "model";
    if (!contents.length && role !== "user") continue;
    const last = contents[contents.length - 1];
    if (last && last.role === role) last.parts[0].text += "\n" + m.text;
    else contents.push({ role, parts: [{ text: m.text.slice(0, 2000) }] });
  }
  return contents;
}

async function handleChat(req, res) {
  if (!API_KEY) return sendJSON(res, 503, { error: "GEMINI_API_KEY is not set in .env" });

  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 100_000) return sendJSON(res, 413, { error: "Message too long" });
  }

  let messages;
  try { messages = JSON.parse(body).messages; } catch { return sendJSON(res, 400, { error: "Invalid JSON" }); }
  const contents = toGeminiContents(Array.isArray(messages) ? messages : []);
  if (!contents.length) return sendJSON(res, 400, { error: "No message" });

  let lastError = "Gemini request failed";
  for (const model of MODELS) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        signal: AbortSignal.timeout(20_000),
        headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 1024 }
        })
      });
      const data = await r.json();
      if (!r.ok) {
        lastError = data.error?.message || `HTTP ${r.status}`;
        console.error(`Gemini error (${model}):`, lastError);
        continue; // try the next model
      }
      const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim();
      if (!text) { lastError = "Empty response from Gemini"; continue; }
      return sendJSON(res, 200, { text, model });
    } catch (err) {
      lastError = err.name === "TimeoutError" ? "Gemini took too long to answer" : "Could not reach Gemini";
      console.error(`Gemini request failed (${model}):`, err.message);
    }
  }
  sendJSON(res, 502, { error: lastError });
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (url.pathname === "/api/chat" && req.method === "POST") return handleChat(req, res);
  if (url.pathname === "/api/status") return sendJSON(res, 200, { ai: Boolean(API_KEY), model: MODEL });

  const file = url.pathname === "/" ? "/index.html" : url.pathname;
  if (!PUBLIC_FILES.has(file)) { res.writeHead(404); return res.end("Not found"); }
  fs.readFile(path.join(__dirname, file), (err, content) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(content);
  });
}).listen(PORT, () => {
  console.log(`HealthyLife running at http://localhost:${PORT}`);
  console.log(API_KEY ? `Gemini AI enabled (models: ${MODELS.join(", ")})` : "No GEMINI_API_KEY in .env - using the built-in offline answers");
});
