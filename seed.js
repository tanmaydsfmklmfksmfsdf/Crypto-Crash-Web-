require('dotenv').config();
const mongoose = require('mongoose');
const Player = require('./models/Player'); 

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB connected!');
  
  // Example seed
  await Player.deleteMany({});
  await Player.insertMany([
    {
      name: 'Aditya',
      balance: { BTC: 0.015, ETH: 0.01 }
    },
    {
      name: 'Karan',
      balance: { BTC: 0.02, ETH: 0.015 }
    },
    {
      name: 'Neha',
      balance: { BTC: 0.01, ETH: 0.02 }
    }
  ]);

  console.log('Seed data inserted.');
  process.exit(0);
}).catch((err) => {
  console.error('MongoDB error:', err);
  process.exit(1);
});
