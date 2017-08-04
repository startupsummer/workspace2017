const jwt = require('jsonwebtoken');

exports.authorize = (ctx) => new Promise((resolve, reject) => {
  try {
    const token = ctx.request.headers.token;
    let userData = jwt.verify(token, 'secretMessage');

    resolve();
  } catch (e) {
    reject();
  }
})
