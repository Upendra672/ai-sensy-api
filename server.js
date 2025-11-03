import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

//sererHealth check route

app.get("/api/health", (req, res) => {
    res.send("✅ Server is running");
});

// 🧠 API Route
app.post("/api/wealth-score", async (req, res) => {
  try {
    const { income, savings, debts, insurance} = req.body;

    const prompt = `
You are a financial advisor. Based on this user's details, calculate a Financial Health (Wealth) Score from 0–100 and give short advice.

User Details:
- Monthly Income: ${income}
- Monthly Savings: ${savings}
- Debts/Loans: ${debts}
- Health/Term Insurance: ${insurance}

Return JSON only in this format:
{
  "wealth_score": number,
  "summary": "short financial advice"
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4
      })
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "{}";
    const result = JSON.parse(message);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 🚀 Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// - Financial Goal: ${goal}