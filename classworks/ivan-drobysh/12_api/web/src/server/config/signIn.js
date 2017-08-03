const getUser = require('./auth');
const validate = require('./validate');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

module.exports = async (ctx, users) => {
  let isIncorrectData = true;
  const isValid = await validate(ctx);
  const reqData = ctx.request.body;
  if (isValid) {
    const user = getUser(users, reqData.email);
    if (user) {
      if (passwordHash.verify(reqData.password, user.password)) {
        const token = jwt.sign({
          email: user.email,
          password: user.password,
          exp: Math.floor(Date.now() / 1000) + (10 * 60),
          data: 'foobar',
        }, 'secret11');
        user.token = token;
        ctx.body = JSON.stringify({ token });
        isIncorrectData = false;
      }
    }
  }
  if (isIncorrectData && isValid) {
    ctx.body = { msg: 'incorrect data' };
    ctx.status = 400;
  }
};
