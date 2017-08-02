const router = require('koa-router')();


router.post('/post', async (ctx) => {
  ctx.checkBody('firstName').optional().len(3, 20);
  ctx.checkBody('lastName').optional().len(3, 20);
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
  } else {
    ctx.body = { ok: 'true' };
  }
});

router.get('/hello/', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
});

module.exports = router.routes();
