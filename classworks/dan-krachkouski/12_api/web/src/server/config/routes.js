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

const checkBodyMiddleware = async (ctx, next) => {
  console.log('auth')
  ctx.checkBody('login', 'Invalid email').isEmail()
  ctx.checkBody('password', 'Short password').isLength(4)

  const errors = await ctx.validationErrors()

  if (errors) {
    ctx.body = errors
    ctx.status = 400
    return
  }

  await next()
}

const generateToken = (login) => {
  const expires = moment().add(10, 'minutes').format()
  return jwt.sign({ login, expires }, 'supersecret')
}

const respondWithCookie = (ctx, token, expires) => {
  ctx.cookies.set('access_token', token, {
    maxAge: 1000 * 10
  })
  ctx.body = null
}

router.post('/auth', checkBodyMiddleware, async (ctx, next) => {
  const { login, password } = ctx.request.body

  if (db[login]) {
    const user = db[login]
    if (passwordHash.verify(password, user.hash)) {
      const token = generateToken(login)
      respondWithCookie(ctx, token)
    } else {
      ctx.status = 400
    }
  } else {
    const hash = passwordHash.generate(password)
    db[login] = { hash }
    const token = generateToken(login)
    respondWithCookie(ctx, token)
  }
})

router.del('/auth', async (ctx, next) => {
  ctx.cookieso.set('access_token')
  ctx.body = null
})

const validateAcessToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'supersecret')
    if (db[decoded.login] &&
      moment(decoded.expires) > moment()) {
      return true
    }
  } catch (err) {}
  return false
}

const verifyAcessTokenMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token')
  if (validateAcessToken(token)) {
    return next()
  }
  ctx.status = 401
}

router.post('/access', verifyAcessTokenMiddleware, async (ctx, next) => {
  ctx.body = null
})

router.get('/access', async (ctx, next) => {
  const token = ctx.cookies.get('access_token')
  let access = null
  if (validateAcessToken(token)) {
    access = {
      access: 'ACCESS_GRANTED',
      bg: 'green'
    }
  } else {
    access = {
      access: 'ACCESS_DENIED',
      bg: 'red'
    }
    ctx.status = 403
  }
  await ctx.render('secure.html', access)
})

module.exports = (app) => {
  app.use(router.routes())
}
