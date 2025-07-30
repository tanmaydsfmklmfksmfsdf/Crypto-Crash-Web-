function generateCrashPoint(seed, roundNumber) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update(seed + roundNumber).digest('hex');
  const intVal = parseInt(hash.slice(0, 8), 16); 
  const maxCrash = 100 * 100; 
  return (1 + (intVal % maxCrash) / 100).toFixed(2); 
}
let players = {};
let multiplier = 1.0;
let roundInProgress = false;

function startGame(io) {
  setInterval(() => {
    startRound(io);
  }, 10000);
}

function startRound(io) {
  roundInProgress = true;
  const seed = Date.now().toString();
  const crashPoint = generateCrashPoint(seed, Math.floor(Date.now() / 10000));
  multiplier = 1.0;
  let elapsed = 0;

  
  const interval = setInterval(() => {
    multiplier = 1 + elapsed * 0.05;
    io.emit('multiplier', multiplier.toFixed(2));

    if (multiplier >= crashPoint) {
      io.emit('crash', crashPoint);
      roundInProgress = false;
      clearInterval(interval);
    }

    elapsed += 0.1;
  }, 100);
}

module.exports = { startGame };
