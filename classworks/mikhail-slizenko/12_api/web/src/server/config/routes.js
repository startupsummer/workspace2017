const router = require('koa-router')();
const auth = require('./auth');
const validate = require('./validate');
const tokenAuth = require('./token-auth');

router.get('/count', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/signin', async (ctx) => {
  await validate(ctx)
  await auth(ctx)
});

router.get('/secret', async (ctx) => {
  await tokenAuth(ctx)
  ctx.status = 200;
});

module.exports = router.routes();
