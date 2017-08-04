
exports.validate = (ctx) => {
  ctx.checkBody('login').notEmpty().isEmail();
  ctx.checkBody('password').notEmpty();

  if(ctx.validationErrors()) {
    ctx.status = 400;
    ctx.body = {notification: 'Entered data is not correct'};
    return false;
  } else {
    return true;
  }
}
