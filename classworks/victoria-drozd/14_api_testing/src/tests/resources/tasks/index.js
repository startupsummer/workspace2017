const supertest = require('supertest')
const app = require('../../../app')
const auth = require('tests/resources/auth')
const chai = require('chai')
const tasksService = require('resources/tasks/tasks.service')
const staffService = require('resources/staff/staff.service')
const userFactory = require('../staff/user.factory')
const taskFactory = require('./task.factory')

const request = supertest.agent(app.listen())
let token

chai.should()

exports.get = () => {
  describe('test 1: GET /tasks', () => {
    let user

    before(async () => {
      await tasksService.write.remove()
      await staffService.write.remove()

      user = await userFactory.admin()
      await taskFactory.createTask(user._id)
      await taskFactory.createTask(user._id)
      await taskFactory.createTask(user._id)

      token = await auth.signinAsRoot(request, user)
    })

    it('should create and return 3 tasks for admin', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => res.body.results.length.should.equal(3))
        .end(done)
    })
  })
}

exports.create = () => {
  describe('test 4: POST /tasks', () => {
    let user, task

    before(async () => {
      await tasksService.write.remove()
      await staffService.write.remove()

      user = await userFactory.client()
      task = taskFactory.getTaskData(user._id)

      token = await auth.signinAsRoot(request, user)
    })

    it('should not create task for not admin', done => {
      request.post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(task)
        .expect(403)
        .end(done)
    })
  })
}

exports.update = () => {
  describe('test 5: PUT /tasks/:id', () => {
    let user, task

    before(async () => {
      await tasksService.write.remove()
      await staffService.write.remove()

      user = await userFactory.admin()
      task = await taskFactory.createTask(user._id)

      token = await auth.signinAsRoot(request, user)
    })

    it('should update and return task for admin', done => {
      task.title = 'test'

      request.put(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(task)
        .expect(200)
        .expect(res => res.body.results.value.title.should.equal(task.title))
        .end(done)
    })
  })
}

exports.addStaffByAdmin = () => {
  describe('test 6: POST /tasks/:id/participators/:userId', () => {
    let user, task, participator

    before(async () => {
      await tasksService.write.remove()
      await staffService.write.remove()

      user = await userFactory.admin()
      participator = await userFactory.client()
      task = await taskFactory.createTask(user._id)

      token = await auth.signinAsRoot(request, user)
    })

    it('should add any user to task participators for admin', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${participator._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => res.body.results.value.participatorIds.should.include(participator._id))
        .end(done)
    })
  })
}

exports.addStaffByClient = () => {
  describe('test 7: POST /tasks/:id/participators/:userId', () => {
    let user, task, participator

    before(async () => {
      await tasksService.write.remove()
      await staffService.write.remove()

      user = await userFactory.client()
      participator = await userFactory.client()
      task = await taskFactory.createTask(user._id)

      token = await auth.signinAsRoot(request, user)
    })

    it('should not add user to task participators for not admin', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${participator._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403)
        .end(done)
    })
  })
}
