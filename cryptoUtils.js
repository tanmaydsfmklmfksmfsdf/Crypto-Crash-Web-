

const axios = require('axios');

let cachedPrices = {};
let lastFetch = 0;

async function fetchPrices() {
  const now = Date.now();
  if (now - lastFetch < 10000 && cachedPrices.BTC) return cachedPrices;

  const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
  cachedPrices = {
    BTC: res.data.bitcoin.usd,
    ETH: res.data.ethereum.usd
  };
  lastFetch = now;
  return cachedPrices;
}

module.exports = { fetchPrices };
