const router = require('koa-router')();

router.get('/hello', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1;

  await ctx.render('index', {
    name: ctx.params.name,
    count: ctx.session.count,
  });
})


router.post('/hello', async (ctx) => {
  const params = ctx.request.body;
  const {firstName} = params;
  const {lastName} = params;
  console.log(firstName + "   \\\  " + lastName)

  ctx.checkBody('firstName', 'Invalid name').notEmpty().isLength({ min: 3, max: 20 });
  ctx.checkBody('lastName', 'Invalid surname').notEmpty().isLength({ min: 3, max: 20 });
  const errors = await ctx.validationErrors();

  if(errors) {
    console.dir("Error: ");
    console.dir(errors);
    ctx.body = errors;
    ctx.status = 400;
  } else {
    console.dir("Success");
    console.dir(ctx.request.body)
    ctx.body = {ok: 'true'};
  }

})

module.exports = router.routes();
