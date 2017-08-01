const socketIo = require('socket.io');
const messagesService = require('./resources/message/message.service');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    socket.on('subscribe', ({ roomId }) => {
      socket.join(roomId);
      console.log('Joined', roomId);
    });

    socket.on('unsubscribe', ({ roomId }) => {
      socket.leave(roomId);
      console.log('Left', roomId);
    });

    messagesService.on('created', ({ doc: message }) => {
      io.to(message.roomId || 'public').emit('message:sent', message);
    });

    messagesService.on('removed', ({ doc: message }) => {
      io.to(message.roomId || 'public').emit('message:delete', message);
    });
  });
};
