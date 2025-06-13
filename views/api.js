/* istanbul ignore next */
const API_KEY = process.env.GEMINI_API_KEY || "test-key";

const buildApiUrl = (key) => 
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

const API_URL = buildApiUrl(API_KEY);
