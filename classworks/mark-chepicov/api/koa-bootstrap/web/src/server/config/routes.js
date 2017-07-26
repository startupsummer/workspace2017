const router = require('koa-router')();
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const data = {
};

router.get('/hello/:name', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  ctx.session.time = new Date();

  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
    last_session: ctx.session.time,
  });
});

router.post('/post-form', async (ctx) => {
  ctx.checkBody('email').isEmail();
  ctx.checkBody('password').notEmpty().len(5, 20);
  if (ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = ctx.validationErrors();
  } else {
    console.dir(ctx.request.body);

    const verify = (account) => {
      const hashedPassword = (login) => {
        const found = data[login];
        return found ? found.password : null;
      };

      if (hashedPassword(account.email)) {
        const verification = passwordHash
        .verify(account.password, hashedPassword(account.email));
        return verification;
      }

      const password = passwordHash.generate(account.password);
      const email = account.email;

      data[email] = { password };
      return true;
    };

    if (!verify(ctx.request.body)) {
      ctx.status = 400;
      ctx.body = ctx.validationErrors();
    } else {
      const deadline = moment().add(10, 'minutes').format();

      data[ctx.request.body.email].deadline = deadline;

      const token = jwt.sign(ctx.request.body.email, 'shhhhh');

      console.dir(token);

      data[ctx.request.body.email].token = token;

      ctx.body = { ok: 'true', token };
      console.dir(data);
    }
  }
});

router.post('/access', async (ctx) => {
  console.dir(ctx.request.body.token);
  const token = ctx.request.body.token;
  try {
    const decoded = jwt.verify(token, 'shhhhh');

    console.dir(decoded);
    console.dir(data[decoded]);
    const found = data[decoded] && data[decoded].token;

    if (found) {
      if (moment(data[decoded].deadline) < moment()) {
        data[decoded].token = null;
        data[decoded].deadline = null;
        throw new Error();
      } else {
        ctx.body = { ok: true };
      }
    }
  } catch (err) {
    ctx.status = 401;
    // return next();
  }
});

router.post('/logout', async (ctx) => {
  const token = ctx.request.body.token;
  try {
    const decoded = jwt.verify(token, 'shhhhh');

    console.dir(decoded);
    console.dir(data[decoded]);
    const found = data[decoded] && data[decoded].token;
    if (found) {
      data[decoded].token = null;
      data[decoded].deadline = null;
      ctx.body = { ok: true };
    }
  } catch (err) {
    ctx.status = 401;
    // return next();
  }
});

module.exports = router.routes();
