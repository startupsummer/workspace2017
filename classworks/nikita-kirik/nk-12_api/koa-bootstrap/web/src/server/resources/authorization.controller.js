const validate = require('./authorization.validator');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

const storage = {};
const secretKey = 'QQQ';

module.exports.register = async (ctx) => {
  const isValid = await validate(ctx);
  if (!isValid) {
    return;
  }

  const { email, password } = ctx.request.body;
  if(email in storage) {
    ctx.body = { status: 400, mesage: 'User with this email is exist' };
  } else {
    storage[email] = passwordHash.generate(password);
    ctx.body = { status: 'OK', message: 'You are regestred' };
  }
};

module.exports.authorize = async (ctx) => {
  const isValid = await validate(ctx);
  if (!isValid) {
    return;
  }

  const { email, password } = ctx.request.body;
  if(email in storage) {
    // if (storage[email] === passwordHash.generate(password)) {
    if (passwordHash.verify(password, storage[email])) {
      var token = jwt.sign({ email: email }, secretKey, { expiresIn: 10 });
      ctx.body = { token: token };
    } else {
      ctx.body = { status: 'WRONG PASSWORD' };
    }
  } else {
    storage[email] = passwordHash.generate(password);
    ctx.body = { status: 'You are regestred' };
  }
};

module.exports.getSecret = (ctx) => {
  const decoded = jwt.verify(ctx.header.token, secretKey, (err, decoded) => {
    if (err) {
      ctx.body = { status: '403', message: 'Tiken is expired' }
    } else {
      ctx.body = { data1: 'Im', data2: 'a spy' }
    }
  }
);
};
