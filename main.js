// ---------- BMI calculator ----------
document.getElementById("bmi-form").addEventListener("submit", e => {
  e.preventDefault();
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const out = document.getElementById("bmi-result");
  if (!weight || !height) return;
  const r = calcBMI(weight, height);
  out.className = "bmi-result show";
  out.innerHTML = `Your BMI: <b>${r.value}</b> (${r.category})<br><small>${r.advice}</small>`;
});

// ---------- Chat ----------
const messagesEl = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const quickEl = document.getElementById("quick-replies");
const STORAGE_KEY = "healthbot-history";

let history = [];
try { history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { history = []; }

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-50))); } catch {}
}

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function renderMessage({ from, text, warn, time }) {
  const div = document.createElement("div");
  div.className = `msg ${from}${warn ? " warn" : ""}`;
  div.textContent = text; // textContent prevents HTML injection
  const t = document.createElement("time");
  t.textContent = time;
  div.appendChild(t);
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addMessage(msg) {
  const m = { ...msg, time: timeNow() };
  history.push(m);
  save();
  renderMessage(m);
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg bot typing";
  div.innerHTML = "<span></span><span></span><span></span>";
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

// ---------- AI (Gemini via server.js) ----------
let aiEnabled = false;
const statusEl = document.getElementById("bot-status");

async function checkAI() {
  try {
    const r = await fetch("/api/status");
    aiEnabled = r.ok && (await r.json()).ai;
  } catch { aiEnabled = false; }
  statusEl.textContent = aiEnabled ? "Online · AI powered by Gemini" : "Online · Offline answers";
}

// Remove leftover markdown such as **bold** or # headings
function cleanText(t) {
  return t.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^#+\s*/gm, "").replace(/^\s*[*-]\s+/gm, "• ");
}

async function askAI() {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history.filter(m => !m.warn).map(({ from, text }) => ({ from, text })) })
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "AI error");
  return cleanText(data.text);
}

let busy = false;
async function send(text) {
  text = text.trim();
  if (!text || busy) return;
  busy = true;
  addMessage({ from: "user", text });
  input.value = "";
  const typing = showTyping();

  const local = HealthBot.reply(text);
  let reply = local;

  // Emergencies and BMI are answered instantly on the page; everything else goes to Gemini
  if (aiEnabled && !local.warn && !local.isBMI) {
    try {
      reply = { text: await askAI() };
    } catch (err) {
      console.warn("AI unavailable, using offline answer:", err.message);
    }
  } else {
    await new Promise(r => setTimeout(r, Math.min(1500, 400 + local.text.length * 3)));
  }

  typing.remove();
  addMessage({ from: "bot", text: reply.text, warn: reply.warn });
  busy = false;
  input.focus();
}

function greet() {
  addMessage({
    from: "bot",
    text: "Hi! 👋 I'm HealthBot, your wellness assistant.\nAsk me about healthy eating, exercise, sleep, stress, or common symptoms. You can also tell me your weight and height (e.g. \"70kg 175cm\") to get your BMI."
  });
}

form.addEventListener("submit", e => { e.preventDefault(); send(input.value); });

QUICK_REPLIES.forEach(q => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = q;
  b.addEventListener("click", () => send(q === "Calculate BMI" ? "How do I calculate BMI?" : q));
  quickEl.appendChild(b);
});

document.getElementById("clear-chat").addEventListener("click", () => {
  history = [];
  save();
  messagesEl.innerHTML = "";
  greet();
});

// Restore previous conversation or greet
if (history.length) history.forEach(renderMessage);
else greet();
checkAI();
