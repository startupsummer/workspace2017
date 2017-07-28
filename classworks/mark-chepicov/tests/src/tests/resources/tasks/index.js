const taskFactory = require('./task.factory')
const userFactory = require('../users/user.factory')
const auth = require('../auth.js')
const chai = require('chai')
const supertest = require('supertest')
const tasks = require('resources/tasks/tasks.service')

chai.should()

module.exports = (request) => {
  let token, user, task, admin, user1
  tasks.write.remove()
  describe('Task', function() {

    before(async () => {
      admin = await userFactory.admin()
      let task1 = await taskFactory.task(admin._id)
      let task2 = await taskFactory.task(admin._id)
      let task3 = await taskFactory.task(admin._id)
      token = await auth.signinAsRoot(request, admin)
    })
    it('should return some information', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          res.body.results.length.should.be.equal(3)
        })
        .end(done)
    })
  });

  describe('update and get', function() {
    before(async () => {
      task = await taskFactory.task(admin._id)
      task.description = 'EEEEEEEEEEEE' 
      token = await auth.signinAsRoot(request, admin)
    })
    it('should return some information', done => {
      request.put(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(task)
        .expect((res) => {
          res.body.results.value.title.should.be.equal(task.title)
        })
        .end(done)
    })
  });

  describe('Create by user', function() {
    before(async () => {
      user = await userFactory.user()
      task = await taskFactory.task(user._id)
      token = await auth.signinAsRoot(request, user)
      console.log(user)
    })
    it('should return some information', done => {
      request.post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(task)
        .expect(403)
        .end(done)
    })
  });

  describe('add pasticipant', function() {
    before(async () => {
      user = await userFactory.user()
      task = await taskFactory.task(admin._id)
      token = await auth.signinAsRoot(request, admin)
    })
    it('should return some information', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(task)
        .expect(200)
        .end(done)
    })
  });

  describe('add pasticipant failed', function() {
    before(async () => {
      user1 = await userFactory.user()
      token = await auth.signinAsRoot(request, user)
    })
    it('should return some information', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${user1._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(task)
        .expect(403)
        .end(done)
    })
  });
}