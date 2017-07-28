const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const hash = require('password-hash');

const users = [];

router.get('/hello', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/SignIn', async (ctx) => {
  ctx.checkBody('login', 'Inappropriate length').notEmpty();
  ctx.checkBody('password', 'Inappropriate length').notEmpty();

  let login = ctx.request.body.login;
  let password = ctx.request.body.password;

  if(ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = ctx.validationErrors();
  } else {
    console.dir(ctx.request.body)
    signIn(login, password, ctx);
  }
});

router.post('/Message', async (ctx) => {
  authorize(ctx);
});

function signIn(login, password, ctx) {
  const sameUser = users.filter((user) => {
    return (user.login === login && hash.verify(password, user.passwordHash))
  });

  if (sameUser.length) {
    console.log('You are already signed in');
  } else {
    const sameLogin = users.filter((user) => {
      return (user.login === login)
    });

    if (sameLogin.length) {
      console.log('The user with a such login already exists');
    } else {
      const passwordHash = hash.generate(password);
      const token = jwt.sign({login}, 'secretMessage');
      users.push({login, passwordHash, token});
      ctx.body = JSON.stringify({ token });
      console.log('You are successfully authenticated');
    }
  }
}

function authorize(ctx) {
  const token = ctx.request.body.token;
  let user = users.find((user) => user.token === token);
  console.log(user.login);
}

module.exports = router.routes();
