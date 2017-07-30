const supertest = require('supertest')
const app = require('../../../app')
const auth = require('tests/resources/auth')
const chai = require('chai')
const tasksService = require('resources/tasks/tasks.service')
const staffService = require('resources/staff/staff.service')
const userFactory = require('./user.factory')

const request = supertest.agent(app.listen())
let token

chai.should()

exports.updateYourself = () => {
  describe('test 2: PUT /users/:id', () => {
    let user

    before(async () => {
      await tasksService.write.remove()
      await staffService.write.remove()
      user = await userFactory.client()
      token = await auth.signinAsRoot(request, user)
    })

    it('should update user firstName and lastName', done => {
      user.firstName = 'test1'
      user.lastName = 'test2'
      user.password = 'qwerty'

      request.put(`/api/v1/staff/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .expect(200)
        .expect(res => {
          const {firstName, lastName} = res.body.results.value
          firstName.should.equal(user.firstName)
          lastName.should.equal(user.lastName)
        })
        .end(done)
    })
  })
}

exports.updateAnother = () => {
  describe('test 3: PUT /users/:id', () => {
    let firstUser, secondUser

    before(async () => {
      await tasksService.write.remove()
      await staffService.write.remove()

      firstUser = await userFactory.client()
      secondUser = await userFactory.client()

      token = await auth.signinAsRoot(request, firstUser)
    })

    it('should not update another user by not admin', done => {
      secondUser.firstName = 'test'
      secondUser.password = 'qwerty'

      request.put(`/api/v1/staff/${secondUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(secondUser)
        .expect(403)
        .end(done)
    })
  })
}
