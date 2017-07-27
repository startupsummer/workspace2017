const _ = require('lodash')

const userService = require('resources/staff/staff.service').read

const helpers = require('../helpers')

const tenantMiddleware = async function (ctx, next) {
  if (!ctx.state.user) {
    await next()
    return
  }

  const user = await userService.findOne({ _id: ctx.state.user._id })
  ctx.assert(user, 'Not authorized: user not found', 401)

  _.merge(ctx.state, helpers.state.getStateData(user))
  await next()
}

module.exports = tenantMiddleware
