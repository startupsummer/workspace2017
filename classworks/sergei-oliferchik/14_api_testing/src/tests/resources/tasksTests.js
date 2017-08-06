const { should } = require('chai')

const writeStaff = require('resources/staff/staff.service.js')
const writeTasks = require('resources/tasks/tasks.service.js')
const { signinAsRoot } = require('./auth.js')
const createUser = require('./staff')
const createTask = require('./tasks')

should()

const tasksTests = request => {

  describe('test for the request GET /tasks:', function() {
    const admin = createUser.admin()
    const mandatoryTask = createTask.mandatoryTask()
    const advancedTask = createTask.advancedTask()
    const supperAdvancedTask = createTask.supperAdvancedTask()

    let tokenAdmin;

    before(async () => {
      await Promise.all([
        writeStaff.write.remove(),
        writeTasks.write.remove(),
      ])

      await Promise.all([
        writeStaff.write.create(admin),
        writeTasks.write.create(mandatoryTask),
        writeTasks.write.create(advancedTask),
        writeTasks.write.create(supperAdvancedTask),

        tokenAdmin = signinAsRoot(request, admin)
          .then(result => tokenAdmin = result),
      ])
    })

      after(async () => {
        writeStaff.write.remove()
        writeTasks.write.remove()
      })

      it('test that staff can get 3 tasks', done => {
           request.get('/api/v1/tasks')
             .set('Authorization', `Bearer ${tokenAdmin}`)
             .expect(200)
             .end(done);
      })
    })

  describe('test for create tasks:', function() {
    const user = createUser.user()
    const mandatoryTask = createTask.mandatoryTask()

    let tokenUser;

    before(async () => {
      await Promise.all([
        writeStaff.write.remove(),
        writeTasks.write.remove(),
      ])

      await Promise.all([
        writeStaff.write.create(user),
        writeTasks.write.create(mandatoryTask),

        tokenUser = signinAsRoot(request, user)
          .then(result => tokenUser = result),
      ])
    })

      after(async () => {
        writeStaff.write.remove()
        writeTasks.write.remove()
      })

      it('non admin staff tries to create a task, he gets an error 403', done => {
        const title = '!!!!!!!!!!!!!!!'
        const description = '@@@@@@@@@@@@@@@@@'

        request.put(`/api/v1/tasks/${mandatoryTask._id}`)
         .set('Authorization', `Bearer ${tokenUser}`)
         .send(Object.assign({}, { title, description }))
         .expect(403)
         .end(done);
      })
    });

  describe('test for update tasks:', function() {
    const admin = createUser.admin()
    const user = createUser.user()
    const user2 = createUser.user('password')
    const mandatoryTask = createTask.mandatoryTask()

    let tokenAdmin;

    before(async () => {
      await Promise.all([
        writeStaff.write.remove(),
        writeTasks.write.remove(),
      ])

      await Promise.all([
        writeStaff.write.create(admin),
        writeStaff.write.create(user),
        writeStaff.write.create(user2),
        writeTasks.write.create(mandatoryTask),

        tokenAdmin = signinAsRoot(request, admin)
          .then(result => tokenAdmin = result),
        tokenUser = signinAsRoot(request, user)
          .then(result => tokenUser = result),
        tokenUser2 = signinAsRoot(request, user2, 'password')
          .then(result => tokenUser2 = result)
      ])
    })

    after(async () => {
      writeStaff.write.remove()
      writeTasks.write.remove()
    })

    it('admin can successfully update the task, and, as a response, he gets the updated task', done => {
      const title = '!!!!!!!!!!!!!!!'
      const description = '@@@@@@@@@@@@@@@@@'

      request.put(`/api/v1/tasks/${mandatoryTask._id}`)
       .set('Authorization', `Bearer ${tokenAdmin}`)
       .send(Object.assign({}, { title, description }))
       .expect((resp) => {
         const title = resp.body.results.value.title
         const description = resp.body.results.value.description

         title.should.equal(title)
         description.should.equal(description)
       })
       .end(done);
    })

    it('admin can add any staff to the list of participators of the task', done => {
      const participatorIds = user._id

      request.post(`/api/v1/tasks/${mandatoryTask._id}/participators/${user._id}`)
       .set('Authorization', `Bearer ${tokenAdmin}`)
       .send({ participatorIds })
       .expect((resp) => {
         const respParticipatorIds = resp.body.results.value.participatorIds.pop()

         participatorIds.should.equal(respParticipatorIds)
       })
       .end(done);
    })

    it('non admin staff member tries to add another staff to the task he gets an error 403', done => {
      const participatorIds = user._id

      request.post(`/api/v1/tasks/${mandatoryTask._id}/participators/${user._id}`)
       .set('Authorization', `Bearer ${tokenUser2}`)
       .send({ participatorIds })
       .expect(403)
       .end(done);
    })
  })
}

module.exports = tasksTests
