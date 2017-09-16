const jwt = require('jsonwebtoken');
const generateHash = require('./hash.js');
const hash = require('password-hash');

const users = require('./users')

module.exports = async (ctx) => {
  const user = users.find(item =>
    item.email === ctx.request.body.email
  );
  if (user) {
    const password = ctx.request.body.password;
    const hashedPassword = user.password;

    const realUser = hash.verify(password, hashedPassword);
    if (realUser) {
      const token = jwt.sign(user, 'secret', { expiresIn: 600 });
      ctx.body = {token};
    }
  } else {
    const hashedPassword = await generateHash(ctx.request.body.password);
    const email = ctx.request.body.email;
    const newUser = { email: email, password: hashedPassword };
    users.push(newUser);
    const token = jwt.sign(newUser, 'secret', { expiresIn: '10min' });
    ctx.body = {token};
  }
}
