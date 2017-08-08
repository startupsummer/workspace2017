let jwt = require('jsonwebtoken')
let config = require('./config')
let logger = require('./logger')

let jwtOptions = {
  audience: config.audience,
  issuer: config.audience
}

exports.createAuthToken = function (user) {
  let payload = {
    _id: user._id,
    isAdmin: user.isAdmin
  }
  return jwt.sign(payload, config.secret, jwtOptions)
}

exports.decodeToken = function (token) {
  let res = null

  try {
    res = jwt.verify(token, config.secret, jwtOptions)
  } catch (err) {
    logger.warn('Invalid json web token', err)
  }

  return res
}
