const axios = require('axios');

const generateEmailFromPrompt = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      }
    });

    const message = response.data.choices[0].message.content;
    res.status(200).json({ emailBody: message });

  } catch (error) {
    console.error("Error calling Groq API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate email from prompt" });
  }
};

module.exports = { generateEmailFromPrompt };
