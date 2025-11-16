// testOpenAI.js
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// ✅ Use the actual environment variable, not a string
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const run = async () => {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Hello AI!" }],
  });
  console.log(res.choices[0].message.content);
};

run();