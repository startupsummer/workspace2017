const jwt = require('jsonwebtoken');
const users = require('./users')

module.exports = (ctx) => new Promise((resolve, reject) => {
  let token = ctx.request.headers.token;

  if (token == undefined) {
    reject({ message: 'Access denied', status: 401 });
  } else {
    try {
      let decodedToken = jwt.verify(token, 'secret');
      let isAuth = users.find(item => item.email === decodedToken.email)
      console.log(decodedToken);
      if (isAuth) {
        resolve()
      } else {
        reject({ message: 'Access denied', status: 401 });
      }
    } catch(err) {
      console.log(err);
      reject({ message: 'Access denied', status: 401 });
    }
  }
})