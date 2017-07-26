const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const signIn = require('./signIn');
const signUp = require('./signUp');

const users = [];
function verifyUser(usersArray, user) {
  if (usersArray.find(item =>
    item.email === user.email &&
    item.password === user.password)) return true;
  return false;
}
router.get('/signIn', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('signIn', {
    count: ctx.session.count,
  });
});
router.get('/signUp', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('signUp', {
    count: ctx.session.count,
  });
});

router.get('/info', async (ctx) => {
  const user = jwt.verify(ctx.query.token, 'secret');
  if (verifyUser(users, user)) {
    await ctx.render('info');
    console.log('successful authorization');
  } else {
    ctx.body = { msg: 'Permission denide' };
    ctx.status = 401;
  }
});

router.post('/signIn', async (ctx) => {
  await signIn(ctx, users);
});

router.post('/signUp', async (ctx) => {
  await signUp(ctx, users);
});

module.exports = router.routes();
