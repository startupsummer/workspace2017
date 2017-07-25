const controller = require('./user.controller');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const userService = require('./user.service.js');


router.post('/hello', controller.authentication);

router.get('/hello', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.get('/getToken', async (ctx) => {
  console.log(ctx.query.token);
  try {
    const decoded = jwt.verify(ctx.query.token, 'shhhhh');
    ctx.body = decoded;

    console.dir(decoded);
    console.log(userService.isTokenValid(decoded));

    if (await userService.isTokenValid(decoded)) {
      ctx.status = 200;
      ctx.body = decoded;
    } else {
      ctx.status = 401;
      ctx.body = { token: 'Invalid token' };
    }
  } catch (err) {
    ctx.status = 401;
    ctx.body = { token: 'Invalid token' };
  }
});

module.exports = router.routes();
