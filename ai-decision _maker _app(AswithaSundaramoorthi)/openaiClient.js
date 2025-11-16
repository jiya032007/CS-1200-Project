// openaiClient.js
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// ✅ Use the actual environment variable, not a string
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});