const supertest = require('supertest')
const app = require('app') 
const assert = require('assert')
const staffFactory = require('tests/resources/staff/userFactory')
const taskFactory = require('tests/resources/task/taskFactory')
const service = require('resources/staff/staff.service')
const auth = require('tests/resources/auth.js')
const writeServiceStaff = require('resources/staff/staff.service')
const writeServiceTask = require('resources/tasks/tasks.service')


module.exports = (request) => { describe('User', function() {
    const createMockData = () => new Promise(async (resolve) => {
      admin = await staffFactory.admin()
      user1 = await staffFactory.user()
      user2 = await staffFactory.user()
      tasks.push(await taskFactory.publicTask(admin._id, [1]))
      tasks.push(await taskFactory.publicTask(admin._id, [1, 2, 3]))
      tasks.push(await taskFactory.publicTask(admin._id, [1]))
      resolve()
    })
    let admin, user1, user2
    let tasks = []
    let tokenAdmin, tokenUser1

    beforeEach(async () =>  {
      await createMockData()
      tokenAdmin = await auth.signinAsRoot(request, admin)
      tokenUser1 = await auth.signinAsRoot(request, user1)
    })

    afterEach(async () => {
      await writeServiceStaff.write.remove({})
      await writeServiceTask.write.remove({})
      admin, user1, user2, tokenAdmin, tokenUser1 = undefined
      tasks = []
    })

    it('should return 200 in response when method Get task information is work correctly', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect(200)
        .end(done)
    })

    it('should return an error 403 because non admin staff tries to create a task', done => {
      request.post(`/api/v1/tasks/`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .expect(403)
        .end(done)
    })

    it('should return updated task because admin can successfully update the task', done => {
      request.put(`/api/v1/${tasks[0]._id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
          title: 'test title',
          description: 'test description',
        })
        .expect((res => assert(res, tasks[0])))
        .end(done)
    })

    it('should return 200 in response because admin can add any staff to the list of participators of the task', done => {
      request.post(`/api/v1/tasks/${tasks[0]._id}/participators/${user1._id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
          participatorIds: user2._id,
        })
        .expect(200)
        .end(done)
    })

    it('should return an error 403, because non admin staff tries to add another staff to the task', done => {
      request.post(`/api/v1/tasks/${tasks[1]._id}/participators/${user2._id}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({
          participatorIds: user2._id,
        })
        .expect(403)
        .end(done)
    })
  })
}