module.exports = (ctx) => new Promise((resolve, reject) => {
  ctx.checkBody('email').len(3, 20).notEmpty();
  ctx.checkBody('password').len(3, 20).notEmpty();

  const errors = ctx.validationErrors();
  if(errors) {
    reject({ message: 'validation fails', status: 400 });
  } else {
    resolve();
  }
})