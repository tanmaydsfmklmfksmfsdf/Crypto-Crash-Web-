const crypto = require('crypto');

function generateSeed() {
  return crypto.randomBytes(16).toString('hex');
}

function getCrashPoint(seed, roundNumber) {
  const hash = crypto.createHash('sha256').update(seed + roundNumber).digest('hex');
  const intVal = parseInt(hash.slice(0, 8), 16);
  const maxCrash = 100 * 100; 
  return Math.max(1.00, (intVal % maxCrash) / 100);
}

module.exports = { generateSeed, getCrashPoint };