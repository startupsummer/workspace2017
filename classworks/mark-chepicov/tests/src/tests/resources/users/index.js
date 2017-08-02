const userFactory = require('./user.factory')
const auth = require('../auth.js')
const users = require('resources/staff/staff.service')

module.exports = (request) => {
  let tokenUser, tokenAdmin, user, user1, admin

  describe('Users', function() {
    after(async () => {
      await users.write.remove()
    })
    
    beforeEach(async () => {
      await users.write.remove()

      admin = await userFactory.admin()
      user = await userFactory.user()
      user1 = await userFactory.user()

      tokenUser = await auth.signinAsRoot(request, user)
      tokenAdmin = await auth.signinAsRoot(request, admin)
      console.log("admin: ", admin._id)
    })
    
    it('should return changed the first name of user (Bill)', done => {
      user.firstName = 'Bill'
      user.lastName = 'Smith'
      user.password = '123456'
      request.put(`/api/v1/staff/${user._id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(user)
        .expect(200)
        .expect((res) => {
          res.body.results.value.firstName.should.be.equal(user.firstName)
        })
        .end(done)
    })

    it('should return the 403 error because the user can\'t change any other user', done => {
      user1.firstName = 'LUL'
      user1.password = '123456'
      request.put(`/api/v1/staff/${ user1._id }`)
        .set('Authorization', `Bearer ${tokenUser}`)
        .send(user1)
        .expect(403)
        .end(done)
    })
  });
}
