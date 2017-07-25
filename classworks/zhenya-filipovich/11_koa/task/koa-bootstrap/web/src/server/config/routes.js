const router = require('koa-router')();

router.get('/', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/post-form', async (ctx) => {
  ctx.checkBody('fn', 'Invalid length').notEmpty();
  ctx.checkBody('ln', 'Invalid length').notEmpty();

  if (ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = ctx.validationErrors();
  } else {
    console.dir(ctx.request.body);
    ctx.body = { ok: 'true' };
  }
});

module.exports = router.routes();
