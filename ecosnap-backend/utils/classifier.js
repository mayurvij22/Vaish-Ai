const axios = require('axios');

const classifyImage = async (imageUrl) => {
  try {
    const res = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/resnet-50',
      { inputs: imageUrl },
      { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
    );

    const label = res.data?.[0]?.label || 'waste';
    return label;
  } catch (err) {
    console.error('Classifier error:', err.message);
    throw new Error('Classification failed');
  }
};

module.exports = classifyImage;
