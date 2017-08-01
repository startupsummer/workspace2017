module.exports = async (ctx) => {
  ctx.checkBody('email', 'Invalid email').isEmail();
  ctx.checkBody('password', 'Invalid length of password').isLength({ min: 3, max: 20 });
  const errors = await ctx.validationErrors();

  if (errors) {
    ctx.status = 400;
    ctx.body = errors;
    return false;
  }

  return true;
};
