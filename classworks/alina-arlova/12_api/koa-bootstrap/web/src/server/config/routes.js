const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const hash = require('password-hash');
// const auth = require('./authentication.js');

const users = [];

router.get('/hello', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/form', async (ctx) => {
  ctx.checkBody('login', 'Inappropriate length').notEmpty();
  ctx.checkBody('password', 'Inappropriate length').notEmpty();

  let login = ctx.request.body.login;
  let password = ctx.request.body.password;

  if(ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = ctx.validationErrors();
  } else {
    console.dir(ctx.request.body)
    ctx.body = { OK: 'true' }
    // auth.authenticate(ctx.request.body.login, ctx.request.body.password);
    signIn(login, password);
  }

});

function signIn(login, password) {
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
      users.push({login, passwordHash});
      const token = jwt.sign({login}, 'secretMessage');
      console.log('TOKEN ', token);
      console.log('You are successfully authenticated');
    }
  }
  console.log(users);
}

module.exports = router.routes();
