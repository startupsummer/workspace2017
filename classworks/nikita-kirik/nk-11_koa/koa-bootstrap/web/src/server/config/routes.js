const router = require('koa-router')();

router.get('/hello/:name', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
    date: ctx.session.date,
  });
});

router.post('/post-summer-form', async (ctx) => {
  ctx.checkBody('firstName').notEmpty().len(2, 20, 'Dont play with me m..ker !');
  ctx.checkBody('lastName').notEmpty().len(2, 20, 'Dont play with me m..ker !');
  ctx.checkBody('message').optional();
  ctx.checkBody('rating').isInt();

  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }
  ctx.body = {
    status: 200,
    message: 'Thats all right, mama !',
  };
});

module.exports = router.routes();
