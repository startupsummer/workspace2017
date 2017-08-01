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

    socket.on('typing', ({ roomId, userName }) => {
      socket.broadcast.to(roomId || 'public').emit('message:typing', userName);
      console.log('TYPING', roomId, userName);
    });


    messagesService.on('created', ({ doc: message }) => {
      io.to(message.roomId || 'public').emit('message:sent', message);
    });

    messagesService.on('removed', ({ doc: message }) => {
      io.to(message.roomId || 'public').emit('message:removed', message);
    });

    // socket.on('message:send', (msg, callback) => {
    //   setTimeout(() => {
    //     callback({ someData: 'test' });
    //   }, 3000);
    // });
  });
};
