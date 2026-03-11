const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Claude configuration
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY not set in environment variables');
    process.exit(1);
}

const client = new Anthropic({
    apiKey: API_KEY,
});

console.log('✓ Claude API Key loaded from .env');

// System prompt for generating uplifting affirmations
const SYSTEM_PROMPT = `You are a compassionate and empowering affirmation generator dedicated to uplifting Black women.
Your role is to create powerful, authentic, and meaningful affirmations that celebrate the strength, beauty, brilliance, and resilience of Black women.

When generating affirmations:
- Make them personal and empowering
- Celebrate Black beauty, culture, and achievements
- Promote self-love, confidence, and resilience
- Be authentic and avoid clichés
- Keep them concise (1-3 sentences max)
- Focus on positive affirmations, not negations
- DO NOT include any emojis

Generate ONE fresh, unique affirmation each time.`;

// API endpoint to fetch uplifting affirmations
app.post('/api/tweets', async (req, res) => {
    try {
        const { query } = req.body;

        console.log(`\n✨ Generating affirmation for Black women...`);

        // Call Claude API to generate an affirmation
        const message = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 150,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: 'Generate an uplifting affirmation for Black women.',
                },
            ],
        });

        // Extract the text from the response
        const affirmationText = message.content[0].type === 'text'
            ? message.content[0].text
            : 'You are powerful, beautiful, and worthy.';

        console.log(`✓ Generated affirmation`);

        // Format as a "tweet-like" object
        const affirmation = {
            id: `aff-${Date.now()}`,
            text: affirmationText,
            created_at: new Date().toISOString(),
        };

        res.json({ data: [affirmation] });
    } catch (error) {
        console.error('❌ Error occurred:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
