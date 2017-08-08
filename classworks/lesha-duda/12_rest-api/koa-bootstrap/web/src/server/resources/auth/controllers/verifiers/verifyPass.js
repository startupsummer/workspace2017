let passwordHash = require('password-hash');
let users = require('web/src/server/fantasticDB/usersDb');


function verifyPass(login, password, ctx){
  let isCreated = false;
  users.filter(function(item) {
    if(item.login === login) {
      isCreated = true;
    }
  })

  if(!isCreated) {
    const hashCreated = passwordHash.generate(password);
    users.push({
      login: login,
      hash: hashCreated
    })
  }

  let index = users.map(function(item) { return item.login; }).indexOf(login);
  let hash = users[index].hash;

  // salt include in module, by default salt length is 8
  const passIsCorrect = passwordHash.verify(password, hash);

  return {
    passIsCorrect,
    hash,
  };
};

module.exports = verifyPass;
