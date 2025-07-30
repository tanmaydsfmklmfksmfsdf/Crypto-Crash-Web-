const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: String,
  wallet: {
    BTC: Number,
    ETH: Number
  }
});

module.exports = mongoose.model('Player', playerSchema);