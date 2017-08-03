const helloValidator = require('./validators/hello.validator.js');
const helloService = require('./hello.service');

module.exports.sayHello = async (ctx) => {
  const data = await helloValidator(ctx);

  if (!data.isValid) {
    return;
  }

  const savedHello = await helloService.createHello(data);

  console.log(savedHello);

  ctx.body = `Hello ${data.name}!!!`;
};
