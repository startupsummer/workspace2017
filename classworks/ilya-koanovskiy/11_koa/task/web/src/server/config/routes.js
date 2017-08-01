const router = require('koa-router')();

router.get('/hello', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/hello', async (ctx) => {
  ctx.checkBody('name', 'Invalid name').notEmpty().isLength({ min: 2, max: 20 });
  ctx.checkBody('surname', 'Invalid surname').notEmpty().isLength({ min: 2, max: 20 });
  const errors = await ctx.validationErrors();

  if (errors) {
    console.dir('Error :');
    console.dir(errors);
    ctx.body = errors;
    ctx.status = 400;
  } else {
    console.dir('Success :');
    console.dir(ctx.request.body);
    ctx.body = { ok: true };
  }
});

module.exports = router.routes();
