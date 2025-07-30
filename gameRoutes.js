const express = require('express');
const { placeBet, cashOut, getBalance } = require('../controllers/gameController');
const router = express.Router();

router.post('/bet', placeBet);
router.post('/cashout', cashOut);
router.get('/balance/:playerId', getBalance);

module.exports = router;
