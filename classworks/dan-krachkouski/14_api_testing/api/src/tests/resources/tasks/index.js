const staffFactory = require('tests/resources/staff/staff.factory')
const staffService = require('resources/staff/staff.service')

const tasksFactory = require('tests/resources/tasks/tasks.factory')
const tasksService = require('resources/tasks/tasks.service')

const auth = require('../auth')

const config = require('config')

require('chai').should()

module.exports = (request) => {
  let token = null

  describe('#Tasks', () => {
    beforeEach(async () => {
      await Promise.all([
        staffService.write.remove({}),
        tasksService.write.remove({})
      ])
    })

    it('should return 3 created tasks to admin', async () => {
      const admin = await staffFactory.getAdmin()
      token = await auth.signinAsRoot(request, admin, 'admin')

      await Promise.all([
        tasksFactory.getTask(admin._id),
        tasksFactory.getTask(admin._id),
        tasksFactory.getTask(admin._id)
      ])

      return request.get(`${config.apiPrefix}/tasks`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .expect(200)
        .expect((res) => {
          res.body.results.length.should.be.equal(3)
        })
    })

    it('should not allow regular user to create a task', async () => {
      const user = await staffFactory.getUser()
      token = await auth.signinAsRoot(request, user, 'user')

      return request.post(`${config.apiPrefix}/tasks`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .send({
          _id: '0',
          createrId: '0',
          title: '',
          description: '',
          participatorIds: []
        })
        .expect(403)
    })

    it('should alow admin to update any task', async () => {
      const admin = await staffFactory.getAdmin()
      token = await auth.signinAsRoot(request, admin, 'admin')

      const task = await tasksFactory.getTask(admin._id)

      return request.put(`${config.apiPrefix}/tasks/${task._id}`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .send({
          title: 'changed'
        })
        .expect(200)
        .expect((res) => {
          res.body.results.value.should.have.property('title').be.equal('changed')
        })
    })

    it('should alow admin to add any staff to the list of participators of the task', async () => {
      const admin = await staffFactory.getAdmin()
      token = await auth.signinAsRoot(request, admin, 'admin')

      const task = await tasksFactory.getTask('idididid')
      const user = await staffFactory.getUser()

      return request.post(`${config.apiPrefix}/tasks/${task._id}/participators/${user._id}`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .expect(200)
        .expect((res) => {
          res.body.results.value
            .should.have.property('participatorIds')
            .to.be.an('array')
            .that.include(user._id)
        })
    })

    it('should not alow regular user to add any staff to the list of participators of the task', async () => {
      const user = await staffFactory.getUser()
      const impostor = await staffFactory.getUser()

      const task = await tasksFactory.getTask(user._id)

      token = await auth.signinAsRoot(request, impostor, 'user')

      return request.post(`${config.apiPrefix}/tasks/${task._id}/participators/ididid`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .expect(403)
    })
  })
}
