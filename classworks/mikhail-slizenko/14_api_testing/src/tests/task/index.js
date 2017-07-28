const supertest = require('supertest')
const app = require('../../app')
const request = supertest.agent(app.listen())
const { signinAsRoot } = require('../resources/auth')

const {
  createTask,
  removeAllTasks
} = require('./task.factory')
const {
  createAdmin,
  createClient,
  removeAllUsers
} = require('../user/user.factory')

module.exports = () => {
  describe('Tests for task', function() {
    let admin, client, clientPrey, tokenAdmin, tokenClient, task
    beforeEach(async () => {
      await Promise.all([
        removeAllTasks(),
        removeAllUsers()
      ])

      await Promise.all([
        createAdmin().then(res => admin = res),
        createClient().then(res => client = res),
        createClient().then(res => clientPrey = res)
      ])

      await Promise.all([
        signinAsRoot(request, admin).then(res => tokenAdmin = res),
        signinAsRoot(request, client).then(res => tokenClient = res),
        createTask(client._id).then(res => task = res)
      ])
    })

    it('Test for the request GET /tasks', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect(200)
        .end(done)
    })

    it('Non admin staff tries to create a task', done => {
      request.post('/api/v1/tasks')
        .set('Authorization', `Bearer ${tokenClient}`)
        .send(task)
        .expect(403)
        .end(done)
    })

    it('Admin can successfully update the task', done => {
      task.title = 'Amazing title'
      request.put(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(task)
        .expect(res =>
          res.body.results.value.title.should.be.equal(task.title))
        .end(done)
    })

    it('Admin can add any staff to the list of participators', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${client._id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(task)
        .expect(200)
        .end(done)
    })

    it('Non admin staff member tries to add another staff to the task', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${clientPrey._id}`)
        .set('Authorization', `Bearer ${tokenClient}`)
        .send(task)
        .expect(403)
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
