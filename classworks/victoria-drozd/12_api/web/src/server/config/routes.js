const router = require('koa-router')();

const utils = require('./utils.js');
const COCKIE_KEY = 'token';

const requireAuth = async (ctx, next) => {
  const token = ctx.cookies.get(COCKIE_KEY);
  const verification = await utils.verifyToken(token);

  if (!verification) {
    ctx.status = 401;
    return ctx.redirect('/');
  }
  return next();
};

router.get('/', async (ctx) => {
  await ctx.render('login', { message: 'please login!' });
});

router.get('/protected', requireAuth, async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('protected', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
});

router.post('/post-form', async (ctx) => {
  ctx.checkBody('firstName', 'Invalid first name length').len(3, 20);
  ctx.checkBody('lastName', 'Invalid last name length').len(3, 20);

  if (ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = {ok: false};
  } else {
    console.dir(ctx.request.body);
    ctx.body = {ok: true};
  }
});

router.post('/auth', async (ctx) => {
  const {email, password} = ctx.request.body;

  if (utils.db[email]) {
    const check = await utils.compare(password, utils.db[email]);
    if (!check) {
      ctx.status = 401;
      return;
    }
  } else {
    utils.db[email] = await utils.generateHash(password);
  }

  const token = utils.generateToken(email);
  ctx.cookies.set(COCKIE_KEY, token, {maxAge: utils.TOKEN_EXP * 1000 });
  ctx.status = 200;
  ctx.redirect('/protected');
});

module.exports = router.routes();
