const router = require('koa-router')();

const jwtsecret = 'mysecretkey'; // ключ для подписи JWT
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const moment = require('moment');

const store = new Map();

router.post('/post', async (ctx) => {
  ctx.checkBody('email').isEmail('your enter a bad email');
  ctx.checkBody('password').len(6, 30, 'your enter a bad password');
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = {
      errorValidate: 'true',
      error: ctx.errors,
    };
    return;
  }

  console.log(ctx.request.body);
  ctx.body = { ok: 'true' };
  const user = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
    date: moment().format(),
  };
  const token = jwt.sign(user, jwtsecret);
  store.set(token, user);
  ctx.body.token = token;
  console.log(store.get(token));
});

router.get('/hello/', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
});

module.exports = router.routes();
