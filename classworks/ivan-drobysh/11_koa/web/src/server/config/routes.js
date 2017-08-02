
const util = require('util');

const router = require('koa-router')();

router.get('/session', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;
  await ctx.render('index', {
    count: ctx.session.count,
  });
});

router.post('/session', async (ctx) => {
  const reqData = ctx.request.body;
  ctx.checkBody('firstName', 'Invalid first name').notEmpty().isLength({ min: 3, max: 20 });
  ctx.checkBody('lastName', 'Invalid last name').notEmpty().isLength({ min: 3, max: 20 });


  const errors = await ctx.validationErrors();
  if (errors) {
    console.dir('Error :');
    console.dir(errors);
    ctx.body = errors;
    ctx.status = 400;
  } else {
    console.log(`==========================================
      First name: ${reqData.firstName}
      Last name: ${reqData.lastName}
      Description: ${reqData.textArea}
      Quality ${reqData.select}
  ==========================================`);
    ctx.body = { ok: true };
  }
});

module.exports = router.routes();
