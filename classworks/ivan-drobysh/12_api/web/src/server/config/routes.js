const router = require('koa-router')();
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

const users = [];

function getUser(usersArray, email) {
  return usersArray.find(item => item.email === email);
}

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
  let isIncorrectData = true;
  const reqData = ctx.request.body;
  ctx.checkBody('email', 'Invalid email').isEmail();
  ctx.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 3, max: 20 });
  const errors = await ctx.validationErrors();
  if (errors) {
    console.log('Error :');
    console.log(errors);
    ctx.body = errors;
    ctx.status = 400;
    isIncorrectData = false;
  } else {
    const user = getUser(users, reqData.email);
    if (user) {
      if (passwordHash.verify(reqData.password, user.password)) {
        const token = jwt.sign({
          email: user.email,
          password: user.password,
          exp: Math.floor(Date.now() / 1000) + (10 * 60),
          data: 'foobar',
        }, 'secret');
        user.token = token;
        ctx.body = JSON.stringify({ token });
        isIncorrectData = false;
      }
    }
  }
  if (isIncorrectData) {
    ctx.body = { msg: 'incorrect data' };
    ctx.status = 400;
  }
});

router.post('/signUp', async (ctx) => {
  const reqData = ctx.request.body;
  ctx.checkBody('email', 'Invalid email').isEmail();
  ctx.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 3, max: 20 });
  const errors = await ctx.validationErrors();
  if (errors) {
    console.log('Error :');
    console.log(errors);
    ctx.body = errors;
    ctx.status = 400;
  } else if (getUser(users, reqData.email)) {
    ctx.body = { ok: false, msg: 'User is exits' };
    ctx.status = 400;
  } else {
    const hashedPassword = passwordHash.generate(reqData.password);
    users.push({ email: reqData.email, password: hashedPassword });
    ctx.body = { ok: true };
  }
});

module.exports = router.routes();
