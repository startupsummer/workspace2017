const jwt = require('jsonwebtoken');
const validateForm = require('./validateForm.js');
const passwordHash = require('password-hash');
const db = require('./fakeDB');

module.exports = async (ctx) => {
  const isValid = await validateForm(ctx);
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  if (isValid) {
    const user = db.find(
      myUser => myUser.email === email && passwordHash.verify(password, myUser.password),
    );

    if (user) {
      const token = jwt.sign(
        {
          email: user.email,
          password: user.password,
          exp: 15,
          data: 'foobar',
        },
        'secretCode',
      );

      user.token = token;
      ctx.body = JSON.stringify({ token });
    } else {
      ctx.body = JSON.stringify({ message: "User doesn't exist" });
      ctx.status = 400;
    }
  }
};
