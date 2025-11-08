import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables early
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";
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
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${(req.body ? JSON.stringify(req.body) : "{}")} ${req.body}`);
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

// POST /api/wealth-score
app.post("/api/wealth-score", async (req, res, next) => {
  try {
    // let body = req.body;

    // if (typeof body === "string") {
    //   try {
    //     body = JSON.parse(body);
    //   } catch (e) {}
    // }

    // if (typeof body.data === "string") {
    //   try {
    //     body = JSON.parse(body.data);
    //   } catch (e) {}
    // }

    // const prompt = `You are a financial scoring engine.\nEvaluate the user's financial habits using the 5 questions below. Each question includes (1) the question text and (2) the user’s selected answer.\n\n-------------------------------\nQUESTIONS + USER ANSWERS\n-------------------------------\nQ1 – Investments\n"Do you currently invest in Mutual Funds or SIPs?"\nUser Answer: ${body.investment}\n\nQ2 – Savings Ratio\n"How much of your monthly income do you save/invest?"\nUser Answer: ${body.savings}\n\nQ3 – Protection\n"Do you have insurance for yourself & family?"\nUser Answer: ${body.insuranceProtection}\n\nQ4 – Long-Term Confidence\n"How confident are you about retirement or long-term goals?"\nUser Answer: ${body.longTermConfidence}\n\nQ5 – Guidance Preference\n"Would you like expert help to plan your next financial milestone?"\nUser Answer: ${body.guidancePreference}\n\n-------------------------------\nSCORING LOGIC\n-------------------------------\nAssign a score from 0–100 based on strength of answers.\nStrong answer = 18–22 points\nMedium answer = 10–14 points\nWeak answer = 0–8 points\nEnsure final score stays between 0 and 100.\n\n-------------------------------\nBADGE LEVELS\n-------------------------------\n0–30  → \"Starter Sparrow 🐣\"\n31–50 → \"Growing Saver 🌱\"\n51–70 → \"Smart Saver 🏅\"\n71–85 → \"Wealth Builder 💼\"\n86–100 → \"Financial Pro ⭐\"\n\n-------------------------------\nOUTPUT FORMAT\n-------------------------------\nReturn ONLY pure JSON with exactly these 3 keys:\n{\n  \"wealthScore\": number,\n  \"description\": \"short 2–3 sentences about their financial situation\",\n  \"badgeEarned\": \"one of the five badges\"\n}\n`;

    // console.log("[prompt]", prompt);


    // // Call OpenAI
    // const response = await client.chat.completions.create({
    //   model: OPENAI_MODEL,
    //   messages: [{ role: "user", content: prompt }],
    // });

    // // Validate response shape
    // const choice = response && response.choices && response.choices[0];
    // const rawContent = choice && choice.message && choice.message.content;
    // if (!rawContent) {
    //   console.error("[openai] invalid response", { response });
    //   return res
    //     .status(502)
    //     .json({ error: "Invalid response from language model" });
    // }

    // // Parse model output safely
    // let result;
    // try {
    //   result = JSON.parse(rawContent);
    // } catch (parseErr) {
    //   // In non-production include raw content to help debugging
    //   const payload = { error: "Failed to parse model response as JSON" };
    //   if (process.env.NODE_ENV !== "production") payload.raw = rawContent;
    //   console.error("[parse] failed to parse model output", parseErr);
    //   return res.status(502).json(payload);
    // }

    // // Ensure result has exactly the expected keys
    // const expected = ["wealthScore", "description", "badgeEarned"];
    // const keys = Object.keys(result || {});
    // const missing = expected.filter((k) => !keys.includes(k));
    // const extra = keys.filter((k) => !expected.includes(k));
    // if (missing.length || extra.length) {
    //   const payload = {
    //     error: "Model returned unexpected schema",
    //     missing,
    //     extra,
    //   };
    //   if (process.env.NODE_ENV !== "production") payload.raw = rawContent;
    //   return res.status(502).json(payload);
    // }

    // // Success — return the parsed object directly (not wrapped)
    // console.log("[response]", result);
    return res.json(req.body);
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
