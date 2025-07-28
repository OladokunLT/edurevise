require("dotenv").config();
const express = require("express");
const { pipeline } = require("@xenova/transformers");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Model initialization
let generator;
(async () => {
  try {
    generator = await pipeline("text-generation", "Xenova/gpt2-tiny");
    console.log("Model loaded successfully");
  } catch (err) {
    console.error("Model loading failed:", err);
  }
})();

// Generation endpoint
app.post("/generate-question", async (req, res) => {
  if (!generator) {
    return res.status(503).json({ error: "Model not ready" });
  }

  const prompt = `Generate a WAEC Biology multiple-choice question:
Format:
Question: [Question text]
A. [Option A]
B. [Correct answer]
C. [Option C]
D. [Option D]
Answer: B

Generate a question about ${req.body.topic || "human physiology"}:`;

  try {
    const output = await generator(prompt, {
      max_new_tokens: 150,
      temperature: 0.3,
      repetition_penalty: 1.5,
      top_k: 10,
    });

    res.json({ question: output[0].generated_text.replace(prompt, "").trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Question generator running on port ${port}`);
});
