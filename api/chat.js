import OpenAI from "openai"; 

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  } 

  const { message } = req.body; 

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  } 

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }); 

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Pixel AI, owned by Rehan. Be helpful and smart." },
        { role: "user", content: message },
      ],
    }); 

    const reply = response.choices[0]?.message?.content || "No reply";
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
