// config.test.js
const { buildGeminiUrl } = require('./config');

describe('Gemini API Configuration', () => {
  test('should construct correct API URL', () => {
    const testKey = 'test-api-key-123';
    const expectedUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=test-api-key-123';
    
    expect(buildGeminiUrl(testKey)).toBe(expectedUrl);
  });

  test('should handle empty API key', () => {
    const result = buildGeminiUrl('');
    expect(result).toContain('key=');
    expect(result).toContain('generativelanguage.googleapis.com');
  });

  test('should handle special characters in API key', () => {
    const keyWithSpecialChars = 'key-with_special.chars';
    const result = buildGeminiUrl(keyWithSpecialChars);
    expect(result).toContain(`key=${keyWithSpecialChars}`);
  });
});
