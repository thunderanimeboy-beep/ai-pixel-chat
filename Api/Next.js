import OpenAI from "openai";

export default async function handler(req, res) {
  // Ensure the request is a POST request
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { message } = req.body;

  // Validate that a message was provided in the request body
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // --- API Key Configuration ---
    // Replace "YOUR_OPENAI_API_KEY" with your actual secret key from OpenAI.
    // NOTE: For production, it's highly recommended to use environment variables
    // (like your original code `process.env.OPENAI_API_KEY`) to keep your key secure.
    // Hardcoding keys can be a security risk if your code is public.
    const apiKey = "YOUR_OPENAI_API_KEY";

    // A check to prevent running without a configured API key
    if (!apiKey || apiKey === "YOUR_OPENAI_API_KEY") {
      return res.status(500).json({ error: "The OpenAI API key has not been configured." });
    }

    // Initialize the OpenAI client with your API key
    const client = new OpenAI({
      apiKey: apiKey,
    });

    // Make the API call to OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Pixel AI, owned by Rehan. Be helpful and smart." },
        { role: "user", content: message },
      ],
    });

    // Extract the reply from the response
    const reply = response.choices[0]?.message?.content || "Sorry, I couldn't get a reply.";

    // Send the successful response back
    res.status(200).json({ reply });

  } catch (error) {
    // Log the error for debugging and send a generic error message
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
}
