const router = require('koa-router')();
const db = require('./fakeDB');
const signIn = require('./signIn');
const signUp = require('./signUp');
const validateForm = require('./validateForm');

router.get('/sign-in', async (ctx) => {
  await ctx.render('sign-in');
});

router.get('/sign-up', async (ctx) => {
  await ctx.render('index');
});

router.post('/sign-in', async (ctx) => {
  
});

router.post('/sign-up', async (ctx) => {
  await validateForm(ctx);
});

module.exports = router.routes();
