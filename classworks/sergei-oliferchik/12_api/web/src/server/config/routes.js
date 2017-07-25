const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const dataBase = [];


const validation = async (ctx, next) => {
  const body = ctx.request.body;

  if(body.loginAuthorization && body.passwordAuthorization) {
    ctx.checkBody('loginAuthorization').isEmail("your enter a bad email-authotization.");

    if (ctx.errors) {
     ctx.status = 400;
     ctx.body = ctx.errors;
   }  else {
     return next();
   }
 } else {
   ctx.checkBody('loginRegistration').isEmail("your enter a bad email-registration.");

   if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
  }  else {
    return next();
  }
 }
 return;
};
const authorization = async (ctx) => {
  const body = ctx.request.body;
  
  if(body.loginAuthorization && body.passwordAuthorization) {
    console.log(dataBase);
 } else {

   const salt = new Date();
   const password = body.passwordAuthorization;
   const email = body.loginAuthorization;
   const hash = md5(salt + password);
   const token = jwt.sign({
     IAT: Date.now(),
     JTI: hash,
     ехр: Date.now() + 100*60*60,
     email,
   }, 'shhhhh', { expiresIn: '1min' });

   dataBase.push({
     email,
     salt,
     hash,
   });

  ctx.set({'X-ACCESS-TOKEN': token});
}
}

router
  .get('/hello', async (ctx) => {
    console.dir(ctx.request.headers)
    await ctx.render('index');
  })
  .post('/hello', (ctx, next) => validation(ctx, next), ctx => authorization(ctx) );



module.exports = router.routes();
