const supertest = require('supertest')
const app = require('../../app')
const request = supertest.agent(app.listen())
const { signinAsRoot } = require('../resources/auth')
const chai  = require('chai');
chai.should();

const { createTask } = require('../task/task.factory')
const { createAdmin, createClient } = require('./user.factory')

module.exports = () => {
  describe('Tests for user', function() {
    let admin, client, clientPrey, tokenAdmin, tokenClient, task
    before(async () => {
      admin = await createAdmin()
      client = await createClient()
      clientPrey = await createClient()
      tokenAdmin = await signinAsRoot(request, admin)
      tokenClient = await signinAsRoot(request, client)
      task = await createTask(client._id)
    })

    it('Non admin staff can successfully update himself', done => {
      client.firstName = 'Will'
      client.lastName = "Smith"
      client.password = 'qwerty'
      request.put(`/api/v1/staff/${client._id}`)
        .set('Authorization', `Bearer ${tokenClient}`)
        .send(client)
        .expect(200)
        .end(done)
    })

    it('Non admin staff can\'t update another staff', done => {
      clientPrey.firstName = 'Will'
      clientPrey.password = 'qwerty'
      request.put(`/api/v1/staff/${clientPrey._id}`)
        .set('Authorization', `Bearer ${tokenClient}`)
        .send(clientPrey)
        .expect(403)
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
  })
}
