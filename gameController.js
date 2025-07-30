const Player = require('../models/Player');
const Transaction = require('../models/Transaction');
const { fetchPrices } = require('../utils/cryptoUtils');
const mongoose = require('mongoose');

function generateFakeHash() {
  return Math.random().toString(36).substring(2, 15);
}

exports.placeBet = async (req, res) => {
  const { playerId, usdAmount, cryptoType } = req.body;

  if (!playerId || !usdAmount || !cryptoType) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (usdAmount <= 0) {
    return res.status(400).json({ error: "USD amount must be positive." });
  }

  try {
    const prices = await fetchPrices();
    const price = prices[cryptoType];
    const cryptoAmount = usdAmount / price;

    const session = await mongoose.startSession();
    session.startTransaction();

    const player = await Player.findById(playerId).session(session);
    if (!player || player.balance[cryptoType] < cryptoAmount) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Insufficient balance" });
    }

    await Player.updateOne(
      { _id: playerId },
      { $inc: { [`balance.${cryptoType}`]: -cryptoAmount } },
      { session }
    );

    await Transaction.create([{
      playerId,
      usdAmount,
      cryptoAmount,
      currency: cryptoType,
      type: 'bet',
      transactionHash: generateFakeHash(),
      priceAtTime: price,
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, cryptoAmount });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bet failed" });
  }
};

exports.cashOut = async (req, res) => {
  const { playerId } = req.body;

  if (!playerId) {
    return res.status(400).json({ error: "Player ID required" });
  }

  res.status(200).json({ message: "Cashout request received (mock)" });
};

exports.getBalance = async (req, res) => {
  const { playerId } = req.params;

  try {
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ error: "Player not found" });

    const prices = await fetchPrices();

    const balance = {
      BTC: player.balance.BTC,
      ETH: player.balance.ETH,
      USD: {
        BTC: (player.balance.BTC * prices.BTC).toFixed(2),
        ETH: (player.balance.ETH * prices.ETH).toFixed(2),
      }
    };

    res.status(200).json({ balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch balance" });
  }
};
