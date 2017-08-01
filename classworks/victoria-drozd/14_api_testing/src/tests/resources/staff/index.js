const auth = require('tests/resources/auth')
const chai = require('chai')
const staffService = require('resources/staff/staff.service')
const userFactory = require('./user.factory')

chai.should()

module.exports = (request) => {
  let client, client2, clientToken

  describe('Staff testing', () => {
    before(async () => {
      client2 = await userFactory.client()
    })

    beforeEach(async () => {
      client = await userFactory.client()
      clientToken = await auth.signinAsRoot(request, client)
    })

    afterEach(async () => staffService.write.remove())

    it('should update user firstName and lastName', done => {
      client.firstName = 'test1'
      client.lastName = 'test2'
      client.password = 'qwerty'

      request.put(`/api/v1/staff/${client._id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send(client)
        .expect(200)
        .expect(res => {
          const {firstName, lastName} = res.body.results.value
          firstName.should.equal(client.firstName)
          lastName.should.equal(client.lastName)
        })
        .end(done)
    })

    it('should not update another user by not admin', done => {
      client2.firstName = 'test'
      client2.password = 'qwerty'

      request.put(`/api/v1/staff/${client2._id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send(client2)
        .expect(403)
        .end(done)
    })
  })
}
