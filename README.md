# Uplifting Affirmations - Black Women Edition

A JavaScript application that displays AI-generated uplifting affirmations for Black women, triggered by keyboard input. Uses **Claude API** to generate fresh, powerful affirmations each time you press a key.

## Features

- ✨ AI-powered affirmations using Claude API
- 🎨 Beautiful UI with 30pt Helvetica font for affirmations
- ⏰ Displays timestamp in 15pt gray Helvetica font
- ⌨️ Press any key to generate a new affirmation
- 🔒 Secure backend API (API keys not exposed in frontend)
- 🎲 Always fresh, unique affirmations
- 📱 Responsive design
- 💰 Uses free Claude API credits

## Setup Instructions

### 1. Get Your Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Go to **API Keys** section
4. Create a new API key and copy it

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Claude API key:
```
ANTHROPIC_API_KEY=your_actual_claude_api_key_here
PORT=3000
```

### 4. Run the Backend Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

You should see:
```
Server running on http://localhost:3000
✓ Claude API Key loaded from .env
```

### 5. Open the Frontend

Open `index.html` in your browser, or serve it with a simple HTTP server:

```bash
# using Python 3
python -m http.server 8000

# using Node
npx http-server
```

Then visit `http://localhost:8000`

## Usage

1. Make sure the backend server is running on `localhost:3000`
2. Open `index.html` in your browser
3. **Press any key** to generate and display a new uplifting affirmation for Black women
4. Each press generates a fresh, unique affirmation powered by Claude

## How It Works

1. **Frontend** (`index.html` + `app.js`)
   - Listens for any keypress
   - Sends request to backend
   - Displays affirmation in beautiful typography

2. **Backend** (`server.js`)
   - Express.js server
   - Calls Claude API to generate affirmations
   - Returns formatted affirmation to frontend
   - Secure API key management via environment variables

## Customization

### Change the System Prompt
Edit the `SYSTEM_PROMPT` in `server.js` to customize the affirmations:

```javascript
const SYSTEM_PROMPT = `You are a compassionate affirmation generator...`;
```

### Change Colors/Styling
Edit the CSS in `index.html` to customize:
- Background gradient: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
- Font colors, sizes, and families
- Container padding and sizing

### Change API Model
Edit `server.js` and change the model:
```javascript
model: 'claude-opus-4-6',  // or 'claude-sonnet-4-6', 'claude-haiku-4-5'
```

## Troubleshooting

### "Error: Failed to fetch affirmation"
- Make sure the backend server is running on `http://localhost:3000`
- Check that your Claude API key is valid
- Verify the key has the correct permissions in the Anthropic console

### "ANTHROPIC_API_KEY not set"
- Make sure you created `.env` file and added your API key
- Restart the server after adding the key

### CORS Issues
- Make sure the backend is running before opening the frontend
- The backend has CORS enabled by default

## API Endpoints

### POST `/api/tweets`
Generates an uplifting affirmation using Claude.

**Request:**
```json
{
  "query": "any string (ignored by Claude)"
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "aff-1234567890",
      "text": "You are a radiant force of power and grace, deserving of all the beauty and success you create.",
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

## Why Claude API?

- **High Quality**: Claude generates thoughtful, authentic affirmations
- **Flexible**: Easy to customize the affirmations via system prompts
- **Secure**: API keys never exposed to frontend
- **Fast**: Quick generation of affirmations
- **Free Tier**: Get started with free API credits

## License

MIT

## Credits

Built to celebrate and uplift Black women through empowering affirmations powered by AI.
