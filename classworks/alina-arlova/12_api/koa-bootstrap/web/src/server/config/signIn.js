const jwt = require('jsonwebtoken');
const hash = require('password-hash');

exports.signIn = (ctx, users) => {
  let login = ctx.request.body.login;
  let password = ctx.request.body.password;

  const sameUser = users.filter((user) => {
    return (user.login === login && hash.verify(password, user.passwordHash))
  });

  if (sameUser.length) {
    ctx.body = {notification: 'You are already signed in'};
  } else {
    const sameLogin = users.filter((user) => {
      return (user.login === login)
    });

    if (sameLogin.length) {
      ctx.body = {notification: 'The user with such login already exists'};
    } else {
      const passwordHash = hash.generate(password);
      const token = jwt.sign({login}, 'secretMessage', { expiresIn: '10sec' });
      users.push({login, passwordHash, token});

      ctx.body = {token: token, notification: 'You are successfully authenticated'};

    }
  }
}
