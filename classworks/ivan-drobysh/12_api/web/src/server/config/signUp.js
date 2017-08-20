const getUser = require('./auth');
const validate = require('./validate');
const passwordHash = require('password-hash');

module.exports = async (ctx, users) => {
  const reqData = ctx.request.body;
  const isValid = await validate(ctx);
  if (isValid) {
    if (getUser(users, reqData.email)) {
      ctx.body = { ok: false, msg: 'User is exits' };
      ctx.status = 400;
    } else {
      const hashedPassword = passwordHash.generate(reqData.password);
      users.push({ email: reqData.email, password: hashedPassword });
      ctx.body = { ok: true };
    }
  }
};
