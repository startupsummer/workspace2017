const Koa = require('koa')
const Router = require('koa-router')

const supertest = require('supertest')
const assert = require('assert')

const app = new Koa()
var router = new Router()

router.get('/info', async (ctx, next) => {
  ctx.body = 'Information'
})

router.get('/users/:id', async (ctx, next) => {
  ctx.body = {
    _id: ctx.params.id,
    name: 'Evgeny'
  }
})

app.use(router.routes())

const request = supertest.agent(app.listen())

describe('requests', () => {
  it('should return some information', done => {
    request.get('/info')
      .expect(200)
      .end(done)
  })

  it('should return user by id', done => {
    request.get('/users/123')
      .expect(res => {
        assert(res.body.name, 'Evgeny')
        assert(res.body._id, '123')
      })
      .end(done)
  })
})
