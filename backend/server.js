/*************************************************
 * =============== BACKEND (Node.js) =============
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Poll state
let pollOpen = true;
let votes = {}; // { userId: "support" }
let archive = [];

// Calculate percentages
function calcResults() {
  const total = Object.keys(votes).length;
  const support = Object.values(votes).filter(v => v === "support").length;
  const dont = total - support;

  return {
    total,
    support,
    dont,
    supportPct: total ? Math.round((support / total) * 100) : 0,
    dontPct: total ? Math.round((dont / total) * 100) : 0,
  };
}

// AI summarizer route
app.post("/ask-ai", async (req, res) => {
  const { question } = req.body;

  const prompt = `
  Provide a neutral 200-word summary of the trade-offs for:
  "${question}"
  Do not recommend a side.
  `;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ summary: completion.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "AI error" });
  }
});

// Cast or change vote
app.post("/vote", (req, res) => {
  const { userId, vote } = req.body;

  if (!pollOpen) return res.json({ error: "Poll is closed" });
  if (!["support", "dont"].includes(vote))
    return res.status(400).json({ error: "Invalid vote" });

  votes[userId] = vote; // prevents duplicate votes
  res.json(calcResults());
});

// Live results
app.get("/results", (req, res) => {
  res.json(calcResults());
});

// Close poll & archive it
app.post("/admin/close", (req, res) => {
  pollOpen = false;
  const snapshot = {
    timestamp: Date.now(),
    results: calcResults(),
    votes: { ...votes },
  };
  archive.push(snapshot);
  res.json({ status: "Poll closed", snapshot });
});

// Reset poll
app.post("/admin/reset", (req, res) => {
  pollOpen = true;
  votes = {};
  res.json({ status: "Poll reset" });
});

// Admin logs
app.get("/admin/logs", (req, res) => {
  res.json({
    pollOpen,
    votes,
    archive,
  });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
