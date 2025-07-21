const classifyImage = require('../utils/classifier');
const runGeminiPrompt = require('../utils/gemini');
const WasteLog = require('../models/WasteLog');

exports.uploadAndAnalyzeWaste = async (req, res) => {
  const userId = req.user.id;
  const imageUrl = req.file.path;

  try {
    const material = await classifyImage(imageUrl);

    const prompt = `You are an eco assistant. A user uploaded an image of a "${material}". 
How should it be disposed of? Give one eco-friendly tip.`;

    const ecoTip = await runGeminiPrompt(prompt);

    const log = await WasteLog.create({
      userId,
      imageUrl,
      material,
      ecoTip
    });

    res.json({ imageUrl, material, ecoTip });
  } catch (error) {
    res.status(500).json({ message: 'AI classification or response failed', error: error.message });
  }
};
