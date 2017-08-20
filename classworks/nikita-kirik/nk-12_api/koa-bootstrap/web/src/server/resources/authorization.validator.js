module.exports = ctx => {
  ctx.checkBody('email').isEmail("your enter a bad email.");
  ctx.checkBody('password').notEmpty().len(3, 20);
  if(ctx.errors) {
    ctx.body = ctx.errors;
    return false;
  }
  return true;
}
