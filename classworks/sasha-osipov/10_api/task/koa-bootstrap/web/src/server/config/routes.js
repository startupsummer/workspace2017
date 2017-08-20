const router = require('koa-router')()
const auth = require('./auth')
const authVape = require('./auth-vape')
const validate = require('./validate')

router.post('/hello', async (ctx, next) => {
  await validate(ctx, next)
  await auth(ctx, next)
});

router.get('/vapeshop', async (ctx, next) => {
    try {
        await authVape(ctx, next)
        ctx.body = { res: 'Poveipim????' }
    } catch(err) {
        ctx.status = 401
        ctx.body = { res: 'Ne poveipim((((' }
    }
});

module.exports = router.routes();


