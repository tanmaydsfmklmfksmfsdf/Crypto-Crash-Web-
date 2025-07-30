const { getCrashPoint, generateSeed } = require('../utils/fairCrash');
let currentMultiplier = 1;
let isRunning = false;

function startGameEngine(io) {
  setInterval(async () => {
    if (!isRunning) {
      isRunning = true;
      const seed = generateSeed();
      const roundNumber = Date.now();
      const crashPoint = getCrashPoint(seed, roundNumber);
      io.emit('round-start', { crashPoint });

      let multiplier = 1.00;
      const growthRate = 0.01;

      const interval = setInterval(() => {
        multiplier += growthRate;
        io.emit('multiplier-update', { multiplier });

        if (multiplier >= crashPoint) {
          clearInterval(interval);
          io.emit('round-crash', { crashPoint });
          isRunning = false;
        }
      }, 100);
    }
  }, 10000);
}

module.exports = { startGameEngine };