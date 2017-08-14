const router = require('koa-router')();
const signIn = require('./signIn');
const signUp = require('./signUp');

router.get('/sign-in', async (ctx) => {
  await ctx.render('sign-in');
});

router.get('/', async (ctx) => {
  await ctx.render('sign-up');
});

router.get('/sign-up', async (ctx) => {
  await ctx.render('sign-up');
});

router.post('/sign-in', async (ctx) => {
  await signIn(ctx);
});

router.post('/sign-up', async (ctx) => {
  await signUp(ctx);
});

module.exports = router.routes();
