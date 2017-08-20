const validator = require('validator');


async function authValidator(ctx) {
  const params = ctx.request.body;
  const {login} = params;
  const {password} = params;

  const loginIsCorrect = validator.isEmail(login);
  ctx.checkBody('password', 'Invalid password, length have to be: 6-22').notEmpty().isLength({ min: 6, max: 22 });

  let errors = await ctx.validationErrors();
  if(errors) {
    console.dir("Error: ");
    console.dir(errors);
    ctx.body = errors;
    ctx.status = 400;
    return 
  }

  if(!loginIsCorrect) {
    ctx.body = "Invalid login, could be email";
    return
  }

  return {
    login,
    password
  };
};

module.exports = authValidator
