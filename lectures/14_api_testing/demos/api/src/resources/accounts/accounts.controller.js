const idGenerator = require('lib/mongo/idGenerator')

const config = require('config')
const authService = require('auth.service')
const staffService = require('resources/staff/staff.service').read

const helpers = require('infrastructure/helpers')

const validators = require('./validators')

exports.signin = async (ctx, next) => {
  let result = await validators.signin.validate(ctx)
  ctx.assert(!result.errors, 400)

  let signinData = result.value

  let hashPassword = helpers.crypto.getHash(signinData.password)
  let userQuery = {
    email: signinData.email,
    passwordHash: hashPassword
  }
  let staff = await staffService.findOne(userQuery)
  ctx.assert(staff, 400, 'Email or password is invalid, please try again.')

  let token = authService.createAuthToken(staff)

  ctx.body = {
    user: staff,
    token: token,
    apiUrl: config.apiUrl
  }
}
