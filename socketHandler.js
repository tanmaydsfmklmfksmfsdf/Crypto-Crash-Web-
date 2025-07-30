const { startGameEngine } = require('../services/crashEngine');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('cashout', ({ playerId }) => {
      io.emit('player-cashout', { playerId });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  // Start game engine with io instance
  startGameEngine(io);
};