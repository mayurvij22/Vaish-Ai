const axios = require('axios');

const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 1️⃣ Identify Plant Species from Image
const identifyPlantSpecies = async (photoUrl) => {
  const endpoint = 'https://plant.id/api/v3/identification';

  const requestBody = {
    images: [photoUrl],
    similar_images: true,
    plant_details: ["common_names", "url", "taxonomy", "wiki_description", "watering", "sunlight"],
  };

  const headers = {
    'Content-Type': 'application/json',
    'Api-Key': PLANT_ID_API_KEY,
  };

  const response = await axios.post(endpoint, requestBody, { headers });

  const bestMatch = response.data?.suggestions?.[0];
  const suggestions = response.data?.suggestions?.map(s => ({
    name: s.plant_name,
    probability: s.probability,
    description: s.plant_details?.wiki_description?.value || '',
  })) || [];

  return {
    species: bestMatch?.plant_name || 'Unknown',
    suggestions,
  };
};

// 2️⃣ Generate AI Care Tips (via Gemini)
const generateCareTips = async (species, suggestions) => {
  const prompt = `
You are a plant care expert. Based on this plant species: "${species}", and related species: 
${suggestions.map(s => s.name).join(', ')}, give:

1. Short care tips (max 80 words)
2. 2-3 care tags (e.g., "Low sunlight", "Medium watering")
3. Likely disease this plant may suffer from

Respond in JSON:
{
  "careTips": "...",
  "careTags": [...],
  "predictedDisease": "..."
}
`;

const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
  {
   contents: [{ role: "user", parts: [{ text: prompt }] }]

  }
);


  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  const cleanJSON = JSON.parse(text);

  return cleanJSON;
};

module.exports = {
  identifyPlantSpecies,
  generateCareTips
};
