const router = require('koa-router')();

router.get('/count', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/post-form', async (ctx) => {
  ctx.checkBody('firstName').len(3, 20).notEmpty();
  ctx.checkBody('lastName').len(3, 20).notEmpty();

  const errors = await ctx.validationErrors();
  if(errors) {
    ctx.status = 400;
    ctx.body = 'error';
  } else {
    ctx.body = { ok: 'true' }
  }
});

module.exports = router.routes();
