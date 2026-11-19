# 🌿 HealthyLife – Health Chatbot Website

A simple health and wellness website with **HealthBot**, a chatbot powered by Google Gemini.

## Features
- Healthy living tips (nutrition, exercise, sleep, mental health, hydration)
- BMI calculator
- HealthBot chatbot
  - AI answers from Google Gemini (replies in English or Bahasa Indonesia)
  - Built-in offline answers when Gemini is unavailable
  - Instant emergency warnings (e.g. chest pain)
  - BMI from a message like "70kg 175cm"
  - Chat history saved in the browser

## Run it locally
Requires [Node.js](https://nodejs.org) 18 or newer. No packages to install.

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Copy `.env.example` to `.env` and paste your key:
   ```
   GEMINI_API_KEY=your-key-here
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open http://localhost:5500

Without a key, the site still works using the built-in answers.

## Files
| File | Purpose |
|------|---------|
| `index.html` | The web page |
| `style.css` | Styling |
| `main.js` | Chat and BMI calculator logic |
| `chatbot.js` | Built-in offline answers |
| `server.js` | Serves the site and calls Gemini (keeps the API key secret) |
| `.env.example` | Example settings file |

## Disclaimer
HealthBot gives general wellness information only and is not a substitute for professional medical advice.
