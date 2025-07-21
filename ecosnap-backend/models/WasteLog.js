const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String,
  material: String,
  ecoTip: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WasteLog', wasteLogSchema);
