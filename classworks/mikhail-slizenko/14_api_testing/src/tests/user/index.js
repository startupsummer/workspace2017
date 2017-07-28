const supertest = require('supertest')
const app = require('../../app')
const request = supertest.agent(app.listen())
const { signinAsRoot } = require('../resources/auth')
const chai  = require('chai');
chai.should();

const { createClient, removeAllUsers } = require('./user.factory')

module.exports = () => {
  describe('Tests for user', function() {
    let client, clientPrey, token
    beforeEach(async () => {
      await removeAllUsers()

      await Promise.all([
        createClient().then(res => client = res),
        createClient().then(res => clientPrey = res)
      ])

      token = await signinAsRoot(request, client)
    })

    it('Non admin staff can successfully update himself', done => {
      client.firstName = 'Will'
      client.lastName = "Smith"
      client.password = 'qwerty'
      request.put(`/api/v1/staff/${client._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(client)
        .expect(res => {
          res.body.results.value.firstName.should.be.equal(client.firstName)
          res.body.results.value.lastName.should.be.equal(client.lastName)
        })
        .end(done)
    })

    it('Non admin staff can\'t update another staff', done => {
      clientPrey.firstName = 'Will'
      clientPrey.password = 'qwerty'
      request.put(`/api/v1/staff/${clientPrey._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(clientPrey)
        .expect(403)
        .end(done)
    })

    after(async () => await removeAllUsers())
  })
}
