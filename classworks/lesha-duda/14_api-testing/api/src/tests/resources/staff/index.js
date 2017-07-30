const supertest = require('supertest')
const app = require('app') 
const assert = require('assert')
const chai = require('chai')
const staffFactory = require('tests/resources/staff/userFactory')
const taskFactory = require('tests/resources/task/taskFactory')
const service = require('resources/staff/staff.service')
const auth = require('tests/resources/auth.js')
const writeServiceStaff = require('resources/staff/staff.service')


module.exports = (request) => { describe('User', function() {
    const createMockData = () => new Promise(async (resolve) => {
      admin = await staffFactory.admin()
      user1 = await staffFactory.user()
      user2 = await staffFactory.user()
      resolve()
    })
    let admin, user1, user2
    let tokenAdmin, tokenUser1

    beforeEach(async () =>  {
      await createMockData()
      tokenAdmin = await auth.signinAsRoot(request, admin)
      tokenUser1 = await auth.signinAsRoot(request, user1)
    })

    afterEach(async () => {
      await writeServiceStaff.write.remove({})
      admin, user1, user2, tokenAdmin, tokenUser1 = undefined
    })

    it('should return updated user info (firstname/lastname) from db(server) ', done => {
      request.put(`/api/v1/staff/${user1._id}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ 
          firstName: 'test',
          lastName: 'test',
          password: 'qwerty',
        })
        .expect(res =>  {
          const user = res.body.results.value
          user.firstName.should.equal('test')
          user.lastName.should.equal('test')
        })
        .end(done)
    })

    it('should return an error 403, user1 update user2 firstname/lastname', done => {
      request.put(`/api/v1/staff/${user2._id}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ 
          firstName: 'testChange',
          lastName: 'testChange',
          password: 'qwerty',
        })
        .expect(403) 
        .end(done)
    })
  })
}