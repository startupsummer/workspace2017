const verifyPass = require('web/src/server/resources/auth/controllers/verifiers/verifyPass');
const authValidator = require('web/src/server/resources/auth/validators/auth.validator.js');
const createToken = require('./createToken');


async function authController(ctx) {
  const userObj = await authValidator(ctx);
  const login = userObj.login;
  const password = userObj.password;

  const passObj = verifyPass(login, password, ctx);
  if(!passObj.passIsCorrect) {
    ctx.body = "Invalid credentials (password)";
    ctx.status = 401;
    return 
  }

  console.dir("Authentificaton succeed");
  console.dir(`login ${login}`)

  const token = createToken(login, passObj.hash);

  ctx.body = {
    ok: 'true',
    authentificaton: 'succeed',
    user: login,
    token,
  };
};

module.exports = authController;
