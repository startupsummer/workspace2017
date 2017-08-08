const jwt = require('jsonwebtoken');


function createToken(login, hash) {
  const token = jwt.sign({ 
    login,
    hash,
  }, 'privateSecret', { expiresIn: '10min' });

  return token;
};

module.exports = createToken;
