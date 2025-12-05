import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { getLevelData, scoreFutureVision, scoreHealthDefence, scoreMoneyAwareness, scoreProtectionShield, scoreSurvivalPower } from "./utils/helper.function.js";

// Load environment variables early
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";
const PORT = parseInt(process.env.PORT, 10) || 5000;

if (!OPENAI_API_KEY) {
  console.error("[startup] Missing required env var: OPENAI_API_KEY");
  process.exit(1);
}

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// simple request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${(req.body ? JSON.stringify(req.body) : "{}")}`);
  next();
});

// Init OpenAI Client
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// Health-check route (JSON)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


app.post("/api/wealth-score-2", (req, res) => {
  try {
    const {
      survivalPower,
      moneyAwarness,   // note spelling from your AiSensy attribute
      protectionShield,
      HealthDefence,
      futureVision
    } = req.body;

    // Calculate individual scores
    const s1 = scoreSurvivalPower(survivalPower);
    const s2 = scoreMoneyAwareness(moneyAwarness);
    const s3 = scoreProtectionShield(protectionShield);
    const s4 = scoreHealthDefence(HealthDefence);
    const s5 = scoreFutureVision(futureVision);

    const totalScore = s1 + s2 + s3 + s4 + s5;

    const levelData = getLevelData(totalScore);

    const message = `Your Wealth Score: ${totalScore}/100\n\nLevel: ${levelData.name}\n\n${levelData.description}`;

    return res.json({
      success: true,
      wealthScore: totalScore,
      badgeEarned: levelData.name,
      description: levelData.description,
      message, // ready to send to user in AiSensy
    
    });
  } catch (err) {
    console.error("Error calculating wealth score:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error while calculating wealth score"
    });
  }
});


// POST /api/wealth-score
app.post("/api/wealth-score", async (req, res, next) => {
  try {
    let body = req.body;
    // const prompt = `You are a financial scoring engine.\nEvaluate the user's financial habits using the 5 questions below. Each question includes (1) the question text and (2) the user’s selected answer.\n\n-------------------------------\nQUESTIONS + USER ANSWERS\n-------------------------------\nQ1 – Investments\n"Do you currently invest in Mutual Funds or SIPs?"\nUser Answer: ${body.investment}\n\nQ2 – Savings Ratio\n"How much of your monthly income do you save/invest?"\nUser Answer: ${body.savings}\n\nQ3 – Protection\n"Do you have insurance for yourself & family?"\nUser Answer: ${body.insuranceProtection}\n\nQ4 – Long-Term Confidence\n"How confident are you about retirement or long-term goals?"\nUser Answer: ${body.longTermConfidence}\n\nQ5 – Guidance Preference\n"Would you like expert help to plan your next financial milestone?"\nUser Answer: ${body.guidancePreference}\n\n-------------------------------\nSCORING LOGIC\n-------------------------------\nAssign a score from 0–100 based on strength of answers.\nStrong answer = 18–22 points\nMedium answer = 10–14 points\nWeak answer = 0–8 points\nEnsure final score stays between 0 and 100.\n\n-------------------------------\nBADGE LEVELS\n-------------------------------\n0–30  → \"Starter Sparrow 🐣\"\n31–50 → \"Growing Saver 🌱\"\n51–70 → \"Smart Saver 🏅\"\n71–85 → \"Wealth Builder 💼\"\n86–100 → \"Financial Pro ⭐\"\n\n-------------------------------\nOUTPUT FORMAT\n-------------------------------\nReturn ONLY pure JSON with exactly these 3 keys:\n{\n  \"wealthScore\": number,\n  \"description\": \"short 2–3 sentences about their financial situation\",\n  \"badgeEarned\": \"one of the five badges\"\n}\n`;

    const prompt = `
Evaluate the user's financial habits and return a score (0–100), description (1 sentences), and badge.

User Answers:
1. Investment: ${body.investment}
2. Savings: ${body.savings}
3. Insurance: ${body.insuranceProtection}
4. Confidence: ${body.longTermConfidence}
5. Guidance: ${body.guidancePreference}

The output (description + badgeEarned) MUST be written in this language: ${body.language || "english"}.
Do NOT mix any other language. Only use: ${body.language || "english"}.

Return JSON only:
{
  "wealthScore": number,
  "description": "text",
  "badgeEarned": "text"
}
`;

    // Call OpenAI
    // const response = await client.chat.completions.create({
      // messages: [{ role: "user", content: prompt }],
    const response =await client.responses.create({
      model: OPENAI_MODEL,
      input: prompt,
    });

    const result = response.output_text;

    const parsedResult = JSON.parse(result);

    return res.json(parsedResult);
  } catch (err) {
    next(err);
  }
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  console.error("[error]", err && err.stack ? err.stack : err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));