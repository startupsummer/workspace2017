const userValidator = require('./validators/user.validator.js');
const userService = require('./user.service.js');

module.exports.authentication = async (ctx) => {
  const data = await userValidator(ctx);

  if (data.status !== 200 && data.status !== 204) {
    return;
  }

  const user = data.request.body;
  const updateUser = await userService.findUser({ email: user.name });
  console.log(updateUser);

  if (updateUser != null) {
    await userService.sendToken(updateUser);
    ctx.body = { status: 'sendToken to user' };
  } else {
    await userService.createUser(user);
    ctx.body = { status: 'create new user' };
  }
};
