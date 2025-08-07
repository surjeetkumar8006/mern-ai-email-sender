const { Groq } = require("groq-sdk");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateEmailController = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
    });

    const generatedText = chatCompletion.choices[0]?.message?.content;

    res.status(200).json({
      subject: "Generated Email",
      email: generatedText,
    });
  } catch (error) {
    console.error("AI generation error:", error.message);
    res.status(500).json({ error: "Failed to generate email from prompt." });
  }
};

module.exports = generateEmailController;
