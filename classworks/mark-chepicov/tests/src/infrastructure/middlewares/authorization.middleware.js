const Authorization = require('../authorization')

const authorization = async (ctx, next) => {
  if (!ctx.state.user) {
    await next()
    return
  }

  ctx.state.authorization = new Authorization(ctx.state.user)

  await next()
}

module.exports = authorization
