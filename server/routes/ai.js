const router = require('express').Router();

router.post('/analyze', async (req, res) => {
  try {
    const { title, description } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze this help request and respond in JSON only, no markdown, no backticks:
Title: ${title}
Description: ${description}

Return exactly this format:
{"category": "Programming", "tags": ["tag1", "tag2", "tag3"], "urgency": "low or medium or high", "summary": "one line summary"}`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const cleaned = text.replace(/```json|```/g, '').trim();
    res.json(JSON.parse(cleaned));

  } catch (err) {
    console.log('AI Error:', err.message);
    res.json({
      category: 'General',
      tags: ['help', 'support'],
      urgency: 'medium',
      summary: 'A community member needs assistance.'
    });
  }
});

module.exports = router;