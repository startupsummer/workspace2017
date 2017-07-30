const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const md5 = require('md5')

let authToken;
let auth2;

const dataBase = []

const renderStartPage = async (ctx) => {
  await ctx.render('index')
}

const validation = async (ctx, next) => {
  const body = ctx.request.body

  ctx.checkBody('loginRegistration').isEmail("your enter a bad email-authotization.")

  if (ctx.errors) {
   ctx.status = 400
   ctx.body = ctx.errors
  } else {
    return next()
  }
}

const registration = async (ctx) => {
  const body = ctx.request.body
  const salt = new Date()
  const password = body.passwordRegistration
  const email = body.loginRegistration
  const hash = md5(salt + password)
  const data = {
    email,
    salt,
    hash,
  }

  dataBase.push(data)
  ctx.body = {email};
}

const authorization = async (ctx) => {
  const body = ctx.request.body
  const loginAuthorization = body.loginAuthorization
  const passwordAuthorization = body.passwordAuthorization

  const fitUsers = dataBase.filter(user => user.email === loginAuthorization)
  const fitUser = fitUsers.find(user => user.hash === md5(user.salt + passwordAuthorization))

  if (fitUser) {
   const hash = fitUser.hash
   const email = fitUser.email
   const token = jwt.sign({
     JTI: hash,
     email,
   }, 'shhhhh')
   ctx.sessionSave = true;
   ctx.session.token = token;
 }

  ctx.redirect('/second-page');
}

const secondPage = async (ctx) => {
  const token = ctx.session.token
  
   console.log(ctx.session)
  if (token) {
    const decryptedJWT = jwt.verify(token, 'shhhhh')
    const hash = decryptedJWT.JTI
    const email = decryptedJWT.email
    const fitToken = dataBase.find(el => el.email === email && el.hash === hash)

    if (fitToken) {
      await ctx.render('success')
      return
    }
  }

  await ctx.render('fail')
}

router
  .get('/hello', async (ctx) => renderStartPage(ctx) )
  .post('/sign-up', (ctx, next) => validation(ctx, next), ctx => registration(ctx) )
  .post('/login', (ctx, next) => authorization(ctx, next) )
  .get('/second-page', async (ctx) => secondPage(ctx) )




module.exports = router.routes()
