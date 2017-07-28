const userFactory = require('./user.factory')
const auth = require('../auth.js')
const users = require('resources/staff/staff.service')

module.exports = (request) => {
  let token, user, jertva, killer
  users.write.remove()
  describe('User', function() {
    before(async () => {
      let admin = await userFactory.admin()
      token = await auth.signinAsRoot(request, admin)
    })
    it('should return some information', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(done)
    })
  });

  describe('Successful change', function() {
    before(async () => {
      user = await userFactory.user()
      token = await auth.signinAsRoot(request, user)
      user.firstName = 'Bill'
      user.password = 'Smith'
    })
    it('should return some information', done => {
      request.put(`/api/v1/staff/${ user._id }`)
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .expect(200)
        .end(done)
    })
  });

  describe('Change', function() {
    before(async () => {
      killer = await userFactory.user()
      jertva = await userFactory.user()
      token = await auth.signinAsRoot(request, killer)
      jertva.firstName = 'LUL'
      jertva.password = '123456'
    })
    it('should return some information', done => {
      request.put(`/api/v1/staff/${ jertva._id }`)
        .set('Authorization', `Bearer ${token}`)
        .send(jertva)
        .expect(403)
        .end(done)
    })
  });
}
