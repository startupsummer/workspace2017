const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen())

const writeStaff = require('resources/staff/staff.service.js')
const writeTasks = require('resources/tasks/tasks.service.js')
const { signinAsRoot } = require('./resources/auth.js')
const { admin } = require('./resources/staff')
const { mandatoryTask, advancedTask, supperAdvancedTask } = require('./resources/tasks')


describe('User', function() {
    let token;

    before(async () => {
      await writeStaff.write.remove()
      await writeTasks.write.remove()

      await writeStaff.write.create(admin)
      await writeTasks.write.create(mandatoryTask)
      await writeTasks.write.create(advancedTask)
      await writeTasks.write.create(supperAdvancedTask)

      token = await signinAsRoot(request, admin)
    })
    it('should return tasks', done => {
         request.get('/api/v1/tasks')
           .set('Authorization', `Bearer ${token}`)
           .expect((resp) => {
           })
           .end(done);
       })
  });
