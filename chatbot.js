// HealthBot knowledge base — keyword-matched intents.
// Each intent: keywords (lowercase), and one or more possible answers.
const HEALTH_KB = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "halo", "good morning", "good evening", "good afternoon"],
    answers: [
      "Hello! 👋 I'm HealthBot. Ask me about nutrition, exercise, sleep, stress, hydration, or common symptoms.",
      "Hi there! 🌿 How can I help you stay healthy today?"
    ]
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "thx", "terima kasih", "appreciate"],
    answers: ["You're welcome! 😊 Anything else you'd like to know?", "Happy to help! Stay healthy 💚"]
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "good night"],
    answers: ["Take care! 👋 Remember to drink water and get some rest."]
  },
  {
    id: "diet",
    keywords: ["diet", "eat", "food", "nutrition", "healthy eating", "meal", "vegetable", "fruit", "protein", "carb"],
    answers: [
      "🥗 Healthy eating basics:\n• Fill half your plate with vegetables and fruit\n• Choose whole grains (brown rice, oats, whole-wheat bread)\n• Include lean protein: fish, eggs, beans, tofu, chicken\n• Use healthy fats like olive oil, nuts and avocado\n• Limit sugar, salt, fried and ultra-processed food"
    ]
  },
  {
    id: "weight_loss",
    keywords: ["lose weight", "weight loss", "fat loss", "slim", "overweight", "burn fat", "diet plan"],
    answers: [
      "⚖️ For healthy weight loss:\n• Aim for a small calorie deficit (about 300–500 kcal/day)\n• Eat plenty of protein and fibre to stay full\n• Cut sugary drinks and snacks\n• Move more: walk daily + strength training 2–3×/week\n• Sleep 7–9 hours — poor sleep increases hunger\nA safe pace is about 0.5–1 kg per week."
    ]
  },
  {
    id: "weight_gain",
    keywords: ["gain weight", "underweight", "bulk", "build muscle", "muscle"],
    answers: [
      "💪 To gain weight or build muscle:\n• Eat in a slight calorie surplus with nutrient-dense foods (nuts, milk, eggs, rice, bananas)\n• Get ~1.6 g protein per kg body weight per day\n• Do progressive strength training 3–4×/week\n• Rest well — muscles grow during recovery"
    ]
  },
  {
    id: "exercise",
    keywords: ["exercise", "workout", "fitness", "gym", "sport", "running", "cardio", "training", "walk", "jog"],
    answers: [
      "🏃 WHO recommends for adults:\n• 150–300 min of moderate activity (brisk walking, cycling) OR 75–150 min of vigorous activity per week\n• Strength training on 2+ days per week\n• Sit less — stand up and move every 30–60 minutes\nStart slowly and build up. Warm up before and stretch after!"
    ]
  },
  {
    id: "sleep",
    keywords: ["sleep", "insomnia", "tired", "can't sleep", "cant sleep", "rest", "fatigue", "sleepy"],
    answers: [
      "😴 Better sleep tips:\n• Adults need 7–9 hours per night\n• Go to bed and wake up at the same time daily\n• Avoid caffeine after 2 pm and heavy meals before bed\n• No screens 30–60 minutes before sleep\n• Keep your bedroom dark, quiet and cool\nIf you're constantly tired despite good sleep, consider seeing a doctor."
    ]
  },
  {
    id: "water",
    keywords: ["water", "drink", "hydrate", "hydration", "dehydrated", "thirsty"],
    answers: [
      "💧 Most adults need around 2–2.5 litres (8–10 glasses) of fluid a day — more if it's hot or you're active.\nTip: check your urine colour — pale yellow means you're well hydrated."
    ]
  },
  {
    id: "stress",
    keywords: ["stress", "anxiety", "anxious", "worried", "nervous", "overwhelmed", "pressure", "panic"],
    answers: [
      "🧘 Ways to manage stress:\n• Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s\n• Take a short walk outside\n• Write down your worries and break problems into small steps\n• Limit caffeine and news/social media\n• Talk to someone you trust\nIf anxiety affects your daily life, please talk to a mental health professional."
    ]
  },
  {
    id: "depression",
    keywords: ["sad", "depressed", "depression", "lonely", "hopeless", "unmotivated"],
    answers: [
      "💚 I'm sorry you're feeling this way. Some things that can help:\n• Reach out to a friend or family member\n• Keep a simple routine: sleep, meals, a short walk\n• Do one small thing you used to enjoy\nIf these feelings last more than two weeks, please talk to a doctor or counsellor — you don't have to handle it alone."
    ]
  },
  {
    id: "headache",
    keywords: ["headache", "migraine", "head pain", "head hurts"],
    answers: [
      "🤕 For a common headache:\n• Drink water — dehydration is a frequent cause\n• Rest in a quiet, dark room\n• Apply a cold or warm compress\n• Over-the-counter pain relief (e.g. paracetamol) may help — follow the label\n⚠️ See a doctor urgently if it's sudden and severe, follows a head injury, or comes with fever, stiff neck, confusion, or vision problems."
    ]
  },
  {
    id: "fever",
    keywords: ["fever", "temperature", "hot body", "demam"],
    answers: [
      "🌡️ For a mild fever (above 38°C / 100.4°F):\n• Rest and drink plenty of fluids\n• Wear light clothing\n• Paracetamol or ibuprofen can reduce fever — follow dosage instructions\n⚠️ See a doctor if fever is above 39.5°C, lasts more than 3 days, or comes with rash, breathing difficulty, or confusion. Babies under 3 months with fever need medical care right away."
    ]
  },
  {
    id: "cold_flu",
    keywords: ["cold", "flu", "cough", "sore throat", "runny nose", "sneez", "pilek", "batuk"],
    answers: [
      "🤧 For colds and flu:\n• Rest and stay hydrated (warm water, tea, soup)\n• Gargle warm salt water for a sore throat\n• Honey can soothe coughs (not for babies under 1 year)\n• Wash hands often to avoid spreading it\n⚠️ See a doctor if you have trouble breathing, symptoms last over 10 days, or a high fever."
    ]
  },
  {
    id: "stomach",
    keywords: ["stomach", "diarrhea", "diarrhoea", "nausea", "vomit", "constipation", "bloating", "gastric", "maag", "acid"],
    answers: [
      "🫃 For stomach upset:\n• Sip water or oral rehydration solution (ORS) to replace fluids\n• Eat bland food: rice, bananas, toast, porridge\n• Avoid spicy, fatty foods, coffee and alcohol\n• For constipation: more fibre, water and movement\n⚠️ See a doctor if there's blood in stool/vomit, severe pain, or signs of dehydration."
    ]
  },
  {
    id: "bmi",
    keywords: ["bmi", "body mass", "ideal weight"],
    answers: [
      "📏 BMI = weight (kg) ÷ height (m)²\n• Under 18.5 — Underweight\n• 18.5–24.9 — Normal\n• 25–29.9 — Overweight\n• 30+ — Obese\nYou can use the BMI calculator on this page, or tell me e.g. \"my weight is 70kg and height 175cm\"."
    ]
  },
  {
    id: "heart",
    keywords: ["heart", "blood pressure", "hypertension", "cholesterol", "darah tinggi"],
    answers: [
      "❤️ For a healthy heart:\n• Eat less salt (under 5 g/day) and saturated fat\n• Exercise regularly\n• Don't smoke, limit alcohol\n• Maintain a healthy weight\n• Check your blood pressure regularly — normal is below 120/80 mmHg"
    ]
  },
  {
    id: "diabetes",
    keywords: ["diabetes", "blood sugar", "sugar", "glucose", "insulin", "kencing manis"],
    answers: [
      "🩸 To lower diabetes risk or manage blood sugar:\n• Limit sugary drinks, sweets and refined carbs\n• Choose high-fibre foods and whole grains\n• Be active most days\n• Keep a healthy weight\nCommon warning signs: excessive thirst, frequent urination, unexplained weight loss, blurry vision — get a blood test if you notice these."
    ]
  },
  {
    id: "smoking",
    keywords: ["smoke", "smoking", "cigarette", "vape", "quit", "nicotine", "rokok"],
    answers: [
      "🚭 Quitting smoking is one of the best things you can do for your health.\n• Set a quit date and tell friends for support\n• Identify triggers and replace the habit (chew gum, walk)\n• Ask a doctor about nicotine replacement therapy\nWithin a year of quitting, your heart disease risk drops by about half!"
    ]
  },
  {
    id: "skin",
    keywords: ["skin", "acne", "pimple", "sunscreen", "jerawat"],
    answers: [
      "✨ Healthy skin tips:\n• Wash your face gently twice a day\n• Use sunscreen SPF 30+ daily\n• Don't pick or squeeze pimples\n• Drink water, sleep well and eat fruit & vegetables\n• See a dermatologist for persistent or severe acne"
    ]
  },
  {
    id: "immunity",
    keywords: ["immune", "immunity", "vitamin", "supplement", "vitamin c", "vitamin d"],
    answers: [
      "🛡️ To support your immune system:\n• Eat colourful fruits and vegetables (vitamin C, A, zinc)\n• Get some sunlight for vitamin D\n• Sleep 7–9 hours\n• Exercise and manage stress\n• Keep vaccinations up to date\nSupplements are usually only needed if you have a deficiency — ask a doctor."
    ]
  },
  {
    id: "eyes",
    keywords: ["eye", "eyes", "vision", "screen time", "mata"],
    answers: [
      "👀 Protect your eyes with the 20-20-20 rule: every 20 minutes, look at something 20 feet (6 m) away for 20 seconds.\nAlso keep screens at arm's length, reduce glare, and get an eye check every 1–2 years."
    ]
  },
  {
    id: "about",
    keywords: ["who are you", "what are you", "what can you do", "help", "menu"],
    answers: [
      "I'm HealthBot 🤖 — I can share general tips on:\n• Diet & weight\n• Exercise\n• Sleep\n• Stress & mental health\n• Hydration\n• Common symptoms (headache, fever, cold, stomach)\n• Heart health, diabetes, smoking, skin, eyes\nI can also calculate your BMI! Just try asking."
    ]
  }
];

const EMERGENCY_KEYWORDS = [
  "chest pain", "can't breathe", "cant breathe", "difficulty breathing", "heart attack", "stroke",
  "unconscious", "fainted", "severe bleeding", "suicide", "kill myself", "end my life", "want to die",
  "overdose", "seizure", "poison"
];

const QUICK_REPLIES = ["Healthy diet", "Lose weight", "Exercise tips", "Can't sleep", "Stress", "Headache", "Calculate BMI"];

const HealthBot = {
  normalize(text) {
    return text.toLowerCase().replace(/[^\w\s'’.,]/g, " ").replace(/\s+/g, " ").trim();
  },

  isEmergency(text) {
    return EMERGENCY_KEYWORDS.some(k => text.includes(k));
  },

  // Try to extract weight/height from a message like "70kg 175cm"
  tryBMI(text) {
    const w = text.match(/(\d+(?:[.,]\d+)?)\s*(kg|kilo)/);
    const h = text.match(/(\d+(?:[.,]\d+)?)\s*(cm|m\b)/);
    if (!w || !h) return null;
    const weight = parseFloat(w[1].replace(",", "."));
    let height = parseFloat(h[1].replace(",", "."));
    if (h[2] === "cm") height /= 100;
    if (!weight || !height) return null;
    return calcBMI(weight, height * 100);
  },

  matchIntent(text) {
    let best = null;
    let bestScore = 0;
    for (const intent of HEALTH_KB) {
      let score = 0;
      for (const k of intent.keywords) {
        // whole-word match for short keywords to avoid false positives ("hi" in "this")
        const re = k.length <= 3 ? new RegExp(`\\b${k}\\b`) : null;
        if (re ? re.test(text) : text.includes(k)) score += k.split(" ").length + 1;
      }
      if (score > bestScore) { bestScore = score; best = intent; }
    }
    return best;
  },

  reply(rawText) {
    const text = this.normalize(rawText);

    if (this.isEmergency(text)) {
      return {
        warn: true,
        text: "🚨 This sounds like it could be an emergency. Please call your local emergency number right away (e.g. 112 in Indonesia/Europe, 911 in the US) or go to the nearest hospital.\nIf you're having thoughts of harming yourself, please reach out to a crisis line or someone you trust now — you matter. 💚"
      };
    }

    const bmi = this.tryBMI(text);
    if (bmi) {
      return { isBMI: true, text: `📏 Your BMI is ${bmi.value} — ${bmi.category}.\n${bmi.advice}` };
    }

    const intent = this.matchIntent(text);
    if (intent) {
      const a = intent.answers;
      return { text: a[Math.floor(Math.random() * a.length)] };
    }

    return {
      text: "🤔 I'm not sure about that one. I can help with diet, weight, exercise, sleep, stress, hydration, common symptoms, heart health, diabetes and BMI.\nTry one of the suggestions below, or rephrase your question. For specific medical concerns, please consult a doctor."
    };
  }
};

// Shared BMI helper (used by the chatbot and the calculator form)
function calcBMI(weightKg, heightCm) {
  const m = heightCm / 100;
  const value = +(weightKg / (m * m)).toFixed(1);
  let category, advice;
  if (value < 18.5) {
    category = "Underweight";
    advice = "Consider eating more nutrient-dense meals and talk to a doctor or dietitian if you're losing weight unintentionally.";
  } else if (value < 25) {
    category = "Normal weight";
    advice = "Great job! Keep up balanced eating and regular activity. 🎉";
  } else if (value < 30) {
    category = "Overweight";
    advice = "Small changes help: more vegetables, fewer sugary drinks, and 30 minutes of activity a day.";
  } else {
    category = "Obese";
    advice = "Consider talking to a healthcare professional for a personalised, safe plan. Every small step counts!";
  }
  return { value, category, advice };
}
