const messageService = require('./message.service');

module.exports.getMessage = async (ctx) => {
  ctx.body = await messageService.find({
    roomId: ctx.query.roomId || null,
  }, {
    sort: { createdOn: -1 },
  });
};

module.exports.sendMessage = async (ctx) => {
  const { senderId, content, roomId } = ctx.request.body;
  ctx.body = await messageService.create({ senderId, content, roomId: roomId || undefined });
};

module.exports.deleteMessage = async (ctx) => {
  const id = ctx.params.id;
  await messageService.remove({ _id: id });
  ctx.body = { _id: id };
};
