let passwordHash = require('password-hash');
let users = require('web/src/server/fantasticDB/usersDb');


function verifyToken(token) {
  const hashToken = token.hash;
  const login = token.login;

  let index = users.map(function(item) { return item.login; }).indexOf(login);

  if(index !== -1 || index !== undefined) {
    let hash = users[index].hash;

    if(hash === hashToken) return true;
  }

  return false;
};

module.exports = verifyToken;
