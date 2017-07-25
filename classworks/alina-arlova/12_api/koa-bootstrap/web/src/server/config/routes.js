const router = require('koa-router')();
let users = [];

router.get('/hello', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/form', async (ctx) => {
  ctx.checkBody('login', 'Inappropriate length').notEmpty();
  ctx.checkBody('password', 'Inappropriate length').notEmpty();

  if(ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = ctx.validationErrors();
  } else {
    console.dir(ctx.request.body)
    ctx.body = { OK: 'true' }
  }

});

module.exports = router.routes();
