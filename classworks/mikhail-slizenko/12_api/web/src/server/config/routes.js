const router = require('koa-router')();
const auth = require('./auth');
const validate = require('./validate');
const tokenAuth = require('./token-auth');

router.post('/signin', async (ctx) => {
  await validate(ctx)
  auth(ctx)
});

router.get('/secret', async (ctx) => {
  await tokenAuth(ctx)
  ctx.status = 200;
});

module.exports = router.routes();
