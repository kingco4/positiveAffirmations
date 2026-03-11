
const SEARCH_QUERY = '(Black women OR black women) (uplift OR celebrate OR inspire OR powerful OR amazing OR brilliant OR queen OR strong) -is:retweet lang:en';

// Configuration
const CONFIG = {
    BACKEND_URL: 'http://localhost:3000/api/tweets',
};

let currentTweet = null;
let isRequestPending = false;
let lastRequestTime = 0;
const DEBOUNCE_DELAY = 500; // 500ms debounce to prevent spam

// Letters in "Black Women"
const ALLOWED_LETTERS = new Set(['b', 'l', 'a', 'c', 'k', 'w', 'o', 'm', 'e', 'n']);

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event) {
    const letter = event.key.toLowerCase();

    // Only proceed if the key is a letter in "Black Women"
    if (ALLOWED_LETTERS.has(letter)) {
        // Debounce: prevent rapid-fire requests
        const now = Date.now();
        if (now - lastRequestTime < DEBOUNCE_DELAY || isRequestPending) {
            return;
        }
        lastRequestTime = now;
        fetchAndDisplayTweet();
    }
}

async function fetchAndDisplayTweet() {
    const container = document.getElementById('tweetContainer');
    const errorDiv = document.getElementById('errorMessage');
    const textDiv = document.getElementById('tweetText');

    try {
        isRequestPending = true;

        // Clear error message
        errorDiv.innerHTML = '';

        // Show loading state
        container.classList.add('active');

        // Fetch affirmation from your backend
        const response = await fetch(CONFIG.BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'generate affirmation',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch affirmation');
        }

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            textDiv.textContent = 'Unable to generate affirmation. Try again!';
            return;
        }

        // Get the affirmation (always just one)
        const affirmation = data.data[0];

        // Display the affirmation
        displayAffirmation(affirmation);
    } catch (error) {
        console.error('Error:', error);
        errorDiv.innerHTML = `
            <div class="error">
                <strong>Error:</strong> ${error.message}<br>
                Make sure your backend is configured. See setup guide in README.md
            </div>
        `;
        container.classList.remove('active');
    } finally {
        isRequestPending = false;
    }
}

function displayAffirmation(affirmation) {
    const container = document.getElementById('tweetContainer');
    const textDiv = document.getElementById('tweetText');
    const timeDiv = document.getElementById('tweetTime');

    // Format the text
    textDiv.textContent = affirmation.text;

    // Format the time
    const affirmationDate = new Date(affirmation.created_at);
    const formattedTime = formatTime(affirmationDate);
    timeDiv.textContent = formattedTime;

    container.classList.add('active');
}

function formatTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    // Format as date
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
}
