const router = require('koa-router')();

const controller = require('../resources/authorization.controller');

router.get('/hello/:name', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
    date: ctx.session.date,
  });
});

router.post('/register', async (ctx) => {
  controller.register(ctx);
});

router.post('/authorization', async (ctx) => {
  controller.authorize(ctx);
});


// router.get('/secret-info', async (ctx) => {
//   controller.getSecret(ctx);
// })

router.post('/secret-info', async (ctx) => {
  console.log('token is geted', ctx);
  controller.getSecret(ctx);
})

module.exports = router.routes();
