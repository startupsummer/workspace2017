const staffFactory = require('tests/resources/staff/staff.factory')
const staffService = require('resources/staff/staff.service')

// const tasksFactory = require('tests/resources/tasks/tasks.factory')
const tasksService = require('resources/tasks/tasks.service')

const auth = require('../auth')

const config = require('config')

require('chai').should()

module.exports = (request) => {
  let token = null

  describe('#Staff', () => {
    beforeEach(async () => {
      await Promise.all([
        staffService.write.remove({}),
        tasksService.write.remove({})
      ])
    })

    it('should allow user to set name/lastName of himself', async () => {
      const user = await staffFactory.getUser()
      token = await auth.signinAsRoot(request, user, 'user')

      return request.put(`${config.apiPrefix}/staff/${user._id}`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .send({
          firstName: 'Name',
          lastName: 'LastName',
          password: 'user'
        })
        .expect(200)
        .expect((res) => {
          res.body.results.value.should.have.property('firstName').be.equal('Name')
          res.body.results.value.should.have.property('lastName').be.equal('LastName')
        })
    })

    it('should not allow user to set name/lastName of other user', async () => {
      const hacker = await staffFactory.getUser()
      token = await auth.signinAsRoot(request, hacker, 'user')

      const user = await staffFactory.getUser()

      return request.put(`${config.apiPrefix}/staff/${user._id}`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .send({
          firstName: 'Name',
          lastName: 'LastName',
          password: 'user'
        })
        .expect(403)
    })
  })
}
