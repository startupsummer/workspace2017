module.exports = async (ctx) => {
  ctx.checkBody('email', 'Invalid email').isEmail();
  ctx.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 3, max: 20 });
  const errors = await ctx.validationErrors();
  if (errors) {
    console.log('Error :');
    console.log(errors);
    ctx.body = errors;
    ctx.status = 400;
    return false;
  }
  return true;
};
