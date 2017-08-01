const socketIo = require('socket.io');
const messagesService = require('./resources/message/message.service');
const logger = require('./logger');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    socket.on('subscribe', ({ roomId }) => {
      socket.join(roomId);
      logger.log('Joined', roomId);
    });

    socket.on('unsubscribe', ({ roomId }) => {
      socket.leave(roomId);
      logger.log('Left', roomId);
    });

    messagesService.on('created', ({ doc: message }) => {
      io.to(message.roomId || 'public').emit('message:sent', message);
    });

    messagesService.on('removed', ({ doc: message }) => {
      io.to(message.roomId || 'public').emit('message:deleted', message);
    });

    // socket.on('message:send', (msg, callback) => {
    //   setTimeout(() => {
    //     callback({ someData: 'test' });
    //   }, 3000);
    // });
  });
};
