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
  ctx.body = { ok: 'true' };
  const user = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  };
  const token = jwt.sign(user, jwtsecret);
  store.set(token, {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
    massage: ctx.request.body.summerQuality,
    date: moment().format(),
  });
  ctx.body.token = token;
});

router.get('/hello/', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
}).get('/massage/', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  const token = ctx.request.query.token;
  let user = store.get(token);
  if (user && moment().diff(user.date) / 10000 > 1) {
    store.delete(user.title);
    user = undefined;
  }
  ctx.body = user ? { massage: user.massage } : { massage: 'please logIn' };
});

module.exports = router.routes();
