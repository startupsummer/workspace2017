const taskFactory = require('./task.factory')
const userFactory = require('../users/user.factory')
const auth = require('../auth.js')
const chai = require('chai')
const supertest = require('supertest')
const tasks = require('resources/tasks/tasks.service')
const users = require('resources/staff/staff.service')

chai.should()

module.exports = (request) => {
  let tokenAdmin, tokenUser, user, task, admin, user1, task2
  tasks.write.remove()
  describe('Task', function() {
    beforeEach(async () => {
      admin = await userFactory.admin()
      user = await userFactory.user()
      user1 = await userFactory.user()

      task = await taskFactory.task(admin._id)

      tokenAdmin = await auth.signinAsRoot(request, admin)
      tokenUser = await auth.signinAsRoot(request, user)
    })
    before(async () => {
      task1 = await taskFactory.task()
      task2 = await taskFactory.task()
    })
    afterEach(async () => {
      await tasks.write.remove()
      await users.write.remove()
    })
    it('should return some information', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect((res) => {
          res.body.results.length.should.be.equal(3)
        })
        .end(done)
    })
    it('should return some information', done => {
      task.title = 'Easiest task!' 
      request.put(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(task)
        .expect((res) => {
          res.body.results.value.title.should.be.equal(task.title)
        })
        .end(done)
    })
    it('should return some information', done => {
      request.post('/api/v1/tasks')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send(task)
        .expect(403)
        .end(done)
    })
    it('should return some information', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${user._id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(task)
        .expect(200)
        .expect((res) => {
          res.body.results.value.participatorIds.should.include(user._id)
        })
        .end(done)
    })
    it('should return some information', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${user1._id}`)
        .set('Authorization', `Bearer ${tokenUser}`)
        .send(task)
        .expect(403)
        .end(done)
    })
  });
}