// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI key
});
const openai = new OpenAIApi(configuration);

// Endpoint to handle quote generation
app.post("/generate", async (req, res) => {
  const { input } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate an inspirational quote about ${input}`,
      max_tokens: 60,
    });

    const quote = response.data.choices[0].text.trim();
    res.json({ quote });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating quote");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
