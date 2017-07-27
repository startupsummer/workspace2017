const supertest = require('supertest')
const app = require('../../app')
const request = supertest.agent(app.listen())
const { signinAsRoot } = require('../resources/auth')

const { createTask, removeAllTasks } = require('./task.factory')
const { createAdmin, removeAllUsers } = require('../user/user.factory')

module.exports = () => {
  describe('Tests for task', function() {
    let admin, token
    beforeEach(async () => {
      await Promise.all([
        removeAllTasks(),
        removeAllUsers()
      ])

      admin = await createAdmin()
      token = await signinAsRoot(request, admin)
      await createTask(admin._id)
      await createTask(admin._id)
      await createTask(admin._id)
    })

    it('Test for the request GET /tasks', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(done)
    })

    after( async () => {
      await Promise.all([
        removeAllTasks(),
        removeAllUsers()
      ])
    })
  })
}
