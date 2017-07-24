const router = require('koa-router')()

router.get('/hello/:name', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1

  await ctx.render('views.html', {
    name: ctx.params.name,
    count: ctx.session.count
  })
})

router.post('/howispentsummer', async (ctx) => {
  ctx.checkBody('first').len(3, 20)
  ctx.checkBody('last').len(3, 20)
  if (ctx.errors) {
    ctx.body = { ok: false, errors: ctx.errors }
    ctx.status = 400
    return
  }
  ctx.body = { ok: true }
  console.dir(ctx.request.body)
})

module.exports = router.routes()
