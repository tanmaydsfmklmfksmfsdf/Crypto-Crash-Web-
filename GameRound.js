const mongoose = require('mongoose');

const gameRoundSchema = new mongoose.Schema({
  roundId: String,
  crashPoint: Number,
  seed: String,
  bets: [{
    playerId: String,
    cryptoAmount: Number,
    currency: String,
    cashoutMultiplier: Number,
    cashedOut: Boolean
  }],
  startedAt: Date,
  endedAt: Date
});

module.exports = mongoose.model('GameRound', gameRoundSchema);