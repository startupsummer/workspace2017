const hash = require('password-hash');

module.exports = password => new Promise(resolve => {
  const hashedPassword = hash.generate(password)
  resolve(hashedPassword)
})
