const taskFactory = require('./task.factory')
const supertest = require('supertest')
const app = require('./../../../app')
const auth = require('tests/resources/auth')
const chai = require('chai')
const tasksService = require('resources/tasks/tasks.service')

const request = supertest.agent(app.listen())
let token

chai.should()

module.exports = function (user) {
  describe('GET /tasks', () => {
    before(async () => {
      tasksService.write.remove()

      let userId = user._id
      await taskFactory.task(userId)
      await taskFactory.task(userId)
      await taskFactory.task(userId)

      token = await auth.signinAsRoot(request, user)
    })

    it('respond ...', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect(res => res.body.results.length.should.equal(3))
        .end(done)
    })
  })
}
