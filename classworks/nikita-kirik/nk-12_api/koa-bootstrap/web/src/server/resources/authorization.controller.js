const validate = require('./authorization.validator');
// const DataBase = require('./');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');


const storage = {};
const secretKey = 'QQQ';

module.exports.authorize = async (ctx) => {
  const isValid = await validate(ctx);
  if (!isValid) {
    return;
  }
  console.log('here 2', storage);
  const { email, password } = ctx.request.body;
  if(email in storage) {
    console.log('here 3');
    // if (storage[email] === passwordHash.generate(password)) {
    if (passwordHash.verify(password, storage[email])) {
      var token = jwt.sign({ email: email }, secretKey);
      ctx.body = { token: token };
    } else {
      ctx.body = { key: 'WRANG PASSWORD' };
    }
  } else {
    console.log('here 4');
    storage[email] = passwordHash.generate(password);
    ctx.body = { k: 'you are regestred' };
  }

  // const newUser = dataBase.add(ctx.request.body);
  // if(!newUser) {
  //   DataBase.get();
  // }
};

module.exports.getSecret = (ctx) => {
  const decoded = jwt.verify(ctx.header.token, secretKey);
  console.log('DECODED ',decoded);
  if(decoded.email in storage) {
    ctx.body = { data1: 'Im', data2: 'a spy'}
  } else {
    ctx.body = { error: '401' }
  }
};
