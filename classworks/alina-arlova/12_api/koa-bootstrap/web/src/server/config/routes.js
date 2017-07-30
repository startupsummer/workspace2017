const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const hash = require('password-hash');
const { validate } = require('./validate.js');
const { signIn } = require('./signIn.js');
const { authorize } = require('./authorize.js');

const users = [];

router.post('/SignIn', async (ctx) => {
  if (validate(ctx)) {
    signIn(ctx, users);
  }
});

router.post('/Message', async (ctx) => {
  try {
    await authorize(ctx);
    ctx.body = { message: 'This is a really secret message :)'};
  } catch(e) {
    ctx.status = 401;
    ctx.body = { message: 'You cannot see this super secret message :('};
  }
});

module.exports = router.routes();
