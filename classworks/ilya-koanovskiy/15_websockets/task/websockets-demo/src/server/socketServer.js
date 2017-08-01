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
      io.to(message.roomId || 'public').broadcast.emit('message:delete', message);
    });

    socket.on('typing', ({ roomId, isType }) => {
      io.to(roomId || 'public').emit('type', { isType });
    });

    // socket.on('message:send', (msg, callback) => {
    //   setTimeout(() => {
    //     callback({ someData: 'test' });
    //   }, 3000);
    // });
  });
};
