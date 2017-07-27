const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen())

const writeStaff = require('resources/staff/staff.service.js')
const writeTasks = require('resources/tasks/tasks.service.js')
const { signinAsRoot } = require('./resources/auth.js')
const { admin, user } = require('./resources/staff')
const { mandatoryTask, advancedTask, supperAdvancedTask } = require('./resources/tasks')


describe('Authorization admin and 3 task', function() {
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
           .expect(200)
           .end(done);
       })
  });

  describe('Chenge last,firs name in ussually user', function() {
      let token;

      before(async () => {
        await writeStaff.write.remove()
        await writeTasks.write.remove()

        await writeStaff.write.create(user)

        token = await signinAsRoot(request, user)
      })
      it('should return chenge first,last name', done => {
        const chengeFirsName = '12312321312'
        const chengeLastName = 'sadasdqwd'

           request.put(`/api/v1/staff/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(
              {
               firstName: chengeFirsName,
               lastName: chengeLastName,
               password: 'qwerty',
              }
            )
            .expect((resp) => {
              chengeFirsName === resp.body.firstName
              chengeLastName === resp.body.lastName
            })
            .end(done);
         })
    });
