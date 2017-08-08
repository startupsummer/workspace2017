const router = require('koa-router')();
const validator = require('validator');
const authController = require('web/src/server/resources/auth/controllers/authController');
const friendsController = require('web/src/server/resources/friends/controllers/friendsController');


router.get('/auth', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
})

router.post('/auth', async (ctx) => {
  await authController(ctx);
})

router.get('/friends', async (ctx) => {
  await friendsController(ctx);
})

module.exports = router.routes();

