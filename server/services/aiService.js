const { OpenAI } = require('openai');

/**
 * Sends concatenated raw text from bookings to OpenAI and generates a structured itinerary JSON
 * @param {String} extractedText 
 * @returns {Promise<Object>} Structured itinerary
 */
const generateItinerary = async (extractedText) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables.');
  }

  const openai = new OpenAI({ apiKey });

  const systemPrompt = `You are a professional travel planner. Extract and structure travel information from raw booking documents into a detailed, day-wise travel itinerary. Return ONLY valid JSON in this exact structure:
{
  "title": "Trip to [destination] - [month year]",
  "destination": "string",
  "travelDates": { "from": "YYYY-MM-DD", "to": "YYYY-MM-DD" },
  "flights": [{ "airline": "string", "flightNo": "string", "from": "string", "to": "string", "departure": "string", "arrival": "string" }],
  "hotels": [{ "name": "string", "checkIn": "string", "checkOut": "string", "address": "string", "confirmationNo": "string" }],
  "dayWisePlan": [{ "day": 1, "date": "YYYY-MM-DD", "activities": [{ "time": "string", "activity": "string", "location": "string", "notes": "string" }] }],
  "tips": ["string"],
  "totalBudgetEstimate": "string or null"
}
If any information is not present in the documents, fill it with reasonable guesses or placeholders based on context (e.g. estimate destination or travel dates if not clearly written, or leave flight details empty if not found). Return strictly valid JSON without any leading/trailing explanations.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Here is the raw text extracted from booking documents:\n\n${extractedText}` }
      ],
      temperature: 0.2,
    });

    let resultText = response.choices[0].message.content.trim();

    // Sanitize response by removing markdown blocks if they exist
    if (resultText.startsWith('```')) {
      resultText = resultText.replace(/^```(json)?\n/, '').replace(/\n```$/, '');
    }

    try {
      const parsedData = JSON.parse(resultText);
      return {
        raw: resultText,
        structured: parsedData
      };
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON. Raw response was:', resultText);
      throw new Error('AI generated invalid JSON structure. Please try again.');
    }
  } catch (error) {
    console.error('OpenAI service error:', error);
    throw new Error(`AI generation failed: ${error.message}`);
  }
};

module.exports = { generateItinerary };
