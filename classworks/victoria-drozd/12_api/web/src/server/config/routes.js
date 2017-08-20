const router = require('koa-router')();
const utils = require('./utils.js');
const COOKIE_KEY = 'token';

const requireAuth = async (ctx, next) => {
  const token = ctx.cookies.get(COOKIE_KEY);
  const verification = await utils.verifyToken(token);
  if (!verification) {
    ctx.status = 401;
    return ctx.redirect('/');
  }
  return next();
};

router.get('/', async (ctx) => ctx.render('login'));

router.get('/protected', requireAuth, async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  return ctx.render('protected', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
});

router.post('/post-form', async (ctx) => {
  ctx.checkBody('firstName', 'Invalid first name length').len(3, 20);
  ctx.checkBody('lastName', 'Invalid last name length').len(3, 20);

  if (ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = { ok: false };
  } else {
    ctx.body = ctx.request.body;
    ctx.body.ok = true;
  }
});

router.post('/auth', async (ctx) => {
  const { email, password } = ctx.request.body;

  if (utils.db[email]) {
    const check = await utils.compare(password, utils.db[email]);
    if (!check) {
      ctx.status = 401;
      ctx.body = 'Incorrect password';
      return;
    }
  } else {
    utils.db[email] = await utils.generateHash(password);
  }

  const token = utils.generateToken(email);
  ctx.cookies.set(COOKIE_KEY, token, { 
    httpOnly: false, 
    maxAge: utils.TOKEN_EXP * 1000,
    sameSite: true,
    secure: false,
  });
  ctx.status = 200;
  ctx.body = { ok: true };
});

module.exports = router.routes();
