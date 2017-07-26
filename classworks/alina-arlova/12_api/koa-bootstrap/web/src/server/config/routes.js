const router = require('koa-router')();
const auth = require('./authentication.js');

const users = [{login: 'a'}];

router.get('/hello', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/form', async (ctx) => {
  ctx.checkBody('login', 'Inappropriate length').notEmpty();
  ctx.checkBody('password', 'Inappropriate length').notEmpty();

  if(ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = ctx.validationErrors();
  } else {
    console.dir(ctx.request.body)
    ctx.body = { OK: 'true' }
    // auth.authenticate(ctx.request.body.login, ctx.request.body.password);
    if (authenticate(ctx.request.body.login, ctx.request.body.password)) {
      console.log('You are successfully authenticate');
    } else {
      console.log('Your info is not correct');
    }
  }

});

function authenticate(login, password) {
  const filteredUsers = users.filter((user) => {return user.login === login});
  return filteredUsers.length;
}

module.exports = router.routes();
