const supertest = require('supertest')
const app = require('../../../app')
const auth = require('tests/resources/auth')
const chai = require('chai')
const tasksService = require('resources/tasks/tasks.service')
const staffService = require('resources/staff/staff.service')
const userFactory = require('../staff/user.factory')
const taskFactory = require('./task.factory')

chai.should()

module.exports = (request) => {
  let admin, client, adminToken, clientToken, task

  describe('Tasks testing', () => {
    before(async () => {
      admin = await userFactory.admin()
      client = await userFactory.client()
      adminToken = await auth.signinAsRoot(request, admin)
      clientToken = await auth.signinAsRoot(request, client)
    })

    beforeEach(async () => {
      task = await taskFactory.createTask(admin)
      await taskFactory.createTask(admin)
      await taskFactory.createTask(admin)
    })

    afterEach(async () => tasksService.write.remove())

    it('should create and return 3 tasks for admin', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect(res => res.body.results.length.should.equal(3))
        .end(done)
    })

    it('should not create task for not admin', done => {
      request.post('/api/v1/tasks')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(taskFactory.getTaskData(client._id))
        .expect(403)
        .end(done)
    })

    it('should update and return task for admin', done => {
      task.title = 'test'

      request.put(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(task)
        .expect(200)
        .expect(res => res.body.results.value.title.should.equal(task.title))
        .end(done)
    })

    it('should add any user to task participators for admin', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${client._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect(res => res.body.results.value.participatorIds.should.include(client._id))
        .end(done)
    })

    it('should not add user to task participators for not admin', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${admin._id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(403)
        .end(done)
    })
  })
}
