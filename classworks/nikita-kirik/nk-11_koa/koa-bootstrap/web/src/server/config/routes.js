const router = require('koa-router')();

router.get('/hello/:name', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
    date: ctx.session.date,
  });
});

module.exports = router.routes();
