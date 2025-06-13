// config.js
/* istanbul ignore next */
const API_KEY = process.env.GEMINI_API_KEY || "fallback-key";

// Testable URL construction function
const buildGeminiUrl = (apiKey) => {
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
};

const API_URL = buildGeminiUrl(API_KEY);

module.exports = { buildGeminiUrl, API_URL };
