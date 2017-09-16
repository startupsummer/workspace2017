const socketIo = require('socket.io');
const messagesService = require('./resources/message/message.service');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    socket.on('subscribe', ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on('unsubscribe', ({ roomId }) => {
      socket.leave(roomId);
    });

    messagesService.on('created', ({ doc: message }) => {
      io.to(message.roomId || 'public').emit('message:sent', message);
    });

    messagesService.on('removed', ({ doc: message }) => {
      io.to(message.roomId || 'public').emit('message:deleted', message._id);
    });

    socket.on('user:typing:send', ({ roomId, userId }) => {
      io.to(roomId || 'public').emit('user:typing:recive', {
        roomId, userId,
      });
    });
  });
};
