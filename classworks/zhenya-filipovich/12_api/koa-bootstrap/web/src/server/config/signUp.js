const passwordHash = require('password-hash');
const validateForm = require('./validateForm');
const userExist = require('./userExist');
const db = require('./fakeDB');

module.exports = async (ctx) => {
  const isValid = await validateForm(ctx);

  if (isValid) {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;

    if (userExist(email, db)) {
      ctx.status = 400;
      ctx.body = { ok: false, message: 'User is already exist' };
    } else {
      const hashedPassword = passwordHash.generate(password);
      db.push({ email, password: hashedPassword });
      ctx.status = 200;
      ctx.body = { ok: true };
    }
  }
};
