const jwt = require('jsonwebtoken');
const users = require('./users')

module.exports = (ctx) => new Promise((resolve, reject) => {
  let token = ctx.request.headers.token;

  if (token === undefined || token === 'undefined') {
    reject({ message: 'Token undefined', status: 401 });
  } else {
    try {
      let decodedToken = jwt.verify(token, 'secret');
      let isAuth = users.find(item => item.email === decodedToken.email)
      if (isAuth) {
        resolve()
      } else {
        reject({ message: 'Token expired', status: 401 });
      }
    } catch(err) {
      reject({ message: 'Token expired', status: 401 });
    }
  }
})