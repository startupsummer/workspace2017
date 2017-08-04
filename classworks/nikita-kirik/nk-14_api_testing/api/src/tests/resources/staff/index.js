const taskFactory = require('tests/resources/task/task.factory')
const staffFactory = require('tests/resources/staff/staff.factory')
const tokenFact = require('tests/resources/auth.js')

const staffService = require('resources/staff/staff.service')
const staffWriteService = staffService.write
const taskService = require('resources/tasks/tasks.service')
const taskWriteService = taskService.write

module.exports.test = (request) => {
  let token;
  let admin;
  let client, client2;

  afterEach(async () => {
    await staffWriteService.remove();
    await taskWriteService.remove();
  })

  describe('Client', () => {

    beforeEach(async () => {
      await staffWriteService.remove();
      await taskWriteService.remove();

      client = await staffFactory.client();
      token = await tokenFact.signinAsRoot(request, client);

      client2 = await staffFactory.client();

      admin = await staffFactory.admin();
      task = await taskFactory.task(admin._id);
    })

    it('should be able to update yourself', done => {
      request.put(`/api/v1/staff/${client._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName:  'Nikita',
        lastName: 'Kirik',
        password: '123'
      })
      .expect(200)
      .expect(resp => {
        resp.body.results.value.firstName.should.be.equal('Nikita')
        resp.body.results.value.lastName.should.be.equal('Kirik')
      })
      .end(done)
    })

    it('cannot update another user info', done => {
      request.put(`/api/v1/staff/${client2._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName:  'Luis',
        lastName: 'Gusman',
        password: '444'
      })
      .expect(403, done)
    })

    it('cannot create task', done => {
      request.post(`/api/v1/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect(403, done)
    })

    it('cannot add participators of the task', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${client2._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403, done)
    })

  })


  describe('Admin', () => {
    beforeEach(async () => {
      await staffWriteService.remove()
      await taskWriteService.remove()

      client = await staffFactory.client()
      admin = await staffFactory.admin()
      tokenAdmin = await tokenFact.signinAsRoot(request, admin)
      task = await taskFactory.task(admin._id);
    })

    it('can update task', done => {
      request.put(`/api/v1/tasks/${task._id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        title: 'Learn testing',
        description: 'Learn how to write tests for REST api server.',
        participatorIds: []
      })
      .expect(200)
      .expect(resp => {
        resp.body.results.value.title.should.be.equal('Learn testing')
        resp.body.results.value.description.should.be.equal('Learn how to write tests for REST api server.')
      })
      .end(done)
    })

    it('can add participators of the task', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${client._id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200)
      .expect(resp => {
        resp.body.results.value.participatorIds.should.include(client._id)
      })
      .end(done)
    })

  })

}
