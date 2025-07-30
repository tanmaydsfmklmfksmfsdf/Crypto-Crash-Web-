const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  playerId: String,
  usdAmount: Number,
  cryptoAmount: Number,
  currency: String,
  transactionType: String, // bet/cashout
  transactionHash: String,
  priceAtTime: Number,
  timestamp: Date
});

module.exports = mongoose.model('Transaction', transactionSchema);