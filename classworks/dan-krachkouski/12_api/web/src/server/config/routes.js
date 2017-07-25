const Router = require('koa-router')
const router = new Router()

const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')

const moment = require('moment')

const db = {
  'admin@email.com': {
    hash: passwordHash.generate('admin')
  }
}

const respondWithToken = (user, login) => {
  const token = jwt.sign({ login }, 'supersecret')
  const expires = moment().add(10, 'minutes').format()
  user.jwt = { token, expires }
  return { ok: true, token }
}

router.post('/auth', async (ctx, next) => {
  ctx.checkBody('login', 'Invalid email').isEmail()
  ctx.checkBody('password', 'Short password').isLength(4)

  const errors = await ctx.validationErrors()

  if (errors) {
    ctx.body = errors
    ctx.status = 400
    return next()
  }

  const { login, password } = ctx.request.body

  if (db[login]) {
    const user = db[login]
    if (passwordHash.verify(password, user.hash)) {
      ctx.body = respondWithToken(user, login)
    } else {
      ctx.status = 400

      console.error(db)
      return next()
    }
  } else {
    const hash = passwordHash.generate(password)
    db[login] = { hash }
    const user = db[login]
    ctx.body = respondWithToken(user, login)
  }

  console.error(db)
})

router.post('/acess', async (ctx, next) => {
  const token = ctx.request.body.token
  try {
    const decoded = jwt.verify(token, 'supersecret')

    console.dir(decoded)

    if (db[decoded.login] && db[decoded.login].jwt) {
      const user = db[decoded.login]
      if (moment(user.jwt.expires) < moment()) {
        user.jwt = null
        throw new Error()
      } else {
        ctx.body = { ok: true }
      }
    }
  } catch (err) {
    ctx.status = 401
    return next()
  }
})

module.exports = (app) => {
  app.use(router.routes())
}
