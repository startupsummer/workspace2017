const router = require('koa-router')();

router.get('/hello', async (ctx) => {
  console.dir(ctx.session);
  ctx.session.prevDate = ctx.session.curDate;
  ctx.session.curDate = new Date();

  await ctx.render('index', {
    prevDate: ctx.session.prevDate,
  });
});

router.post('/hello', async (ctx) => {
  console.dir(ctx.request.body);
  ctx.checkBody('firsName').len(3, 20)

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }  else {
    console.dir(ctx.request.body)
    ctx.body = { ok: 'true' }
  }
});


module.exports = router.routes();
