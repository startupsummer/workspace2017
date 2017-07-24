const router = require('koa-router')()

router.get('/hello/:name', async (ctx) => {
  ctx.session.count = ctx.session.count ? ctx.session.count + 1 : 1

  await ctx.render('views.html', {
    name: ctx.params.name,
    count: ctx.session.count
  })
})

module.exports = router.routes()
