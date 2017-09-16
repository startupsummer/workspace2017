module.exports = async (ctx) => {
  ctx.checkBody('name', 'Invalid Email').isEmail();
  ctx.checkBody('surname', 'Invalid password length').notEmpty().len(6, 20);
  const errors = await ctx.validationErrors();
  if (errors) {
    console.dir('Error :');
    console.dir(errors);
    ctx.body = errors;
    ctx.status = 400;
  } else {
    console.dir('Success :');
    console.dir(ctx.request.body);
    ctx.body = { ok: true };
  }
  return ctx;
};
