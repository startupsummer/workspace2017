const router = require('koa-router')();


router.post('/post', async (ctx) => {
  console.dir(ctx.request.body);
  ctx.body = ctx.request.body;
});

router.get('/hello/', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
});

module.exports = router.routes();
