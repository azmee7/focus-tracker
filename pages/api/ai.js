import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { goal, habits } = req.body;

  if (!goal) {
    return res.status(400).json({ error: "Goal required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a habit coach." },
        {
          role: "user",
          content: `
Goal: ${goal}
Current habits: ${habits?.join(", ") || "None"}

Suggest:
• 3 habits
• 1 habit to focus on
• Short improvement advice
`
        }
      ]
    });

    res.json({
      result: completion.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
}
