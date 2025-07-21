const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  score: { type: Number, default: 0 },
  logs: [
    {
      action: String,
      points: Number,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
