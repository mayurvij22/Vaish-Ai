const Plant = require('../models/Plant');
const { identifyPlantSpecies, generateCareTips } = require('../utils/ai');

// POST /api/plants/upload
const uploadPlant = async (req, res) => {
  try {
    const { photoUrl } = req.body;

    // 1. Identify plant via Plant.id or custom model
    const { species, suggestions } = await identifyPlantSpecies(photoUrl);

    // 2. Ask Gemini for care tips
    const { careTips, careTags, predictedDisease } = await generateCareTips(species, suggestions);

    // 3. Save to DB
    const newPlant = new Plant({
      photoUrl,
      species,
      suggestions,
      careTips,
      careTags,
      predictedDisease,
    });

    await newPlant.save();

    res.status(201).json(newPlant);
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
   console.error('❌ Upload failed:', err?.response?.data || err.message);
  }
};

module.exports = { uploadPlant };
