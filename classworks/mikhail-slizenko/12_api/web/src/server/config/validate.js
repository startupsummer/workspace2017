module.exports = (ctx) => new Promise((resolve, reject) => {
  ctx.checkBody('email').len(5, 50).notEmpty();
  ctx.checkBody('password').len(6, 16).notEmpty();

  const errors = ctx.validationErrors();
  if(errors) {
    reject({ message: 'Validation fails', status: 400 });
  } else {
    resolve();
  }
})