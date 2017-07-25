const router = require('koa-router')();

router.get('/hello', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
});

router.post('/post-form', async (ctx) => {
  ctx.checkBody('firstName', 'Invalid first name length').len(3, 20);
  ctx.checkBody('lastName', 'Invalid last name length').len(3, 20);

  if (ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = {ok: false};
  } else {
    console.dir(ctx.request.body);
    ctx.body = {ok: true};
  }
});

module.exports = router.routes();
