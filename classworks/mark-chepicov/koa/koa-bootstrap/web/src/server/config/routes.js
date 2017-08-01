const router = require('koa-router')();

router.get('/hello/:name', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  ctx.session.time = new Date();

  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
    last_session: ctx.session.time,
  });
});

router.post('/post-form', async (ctx) => {
  ctx.checkBody('firstName', 'Invalid length').len(3, 20);
  ctx.checkBody('lastName', 'Invalid length').len(3, 20);
  if (ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = ctx.validationErrors();
  } else {
    console.dir(ctx.request.body);
    ctx.body = { ok: 'true' };
    console.dir(ctx.body);
  }
});

module.exports = router.routes();
