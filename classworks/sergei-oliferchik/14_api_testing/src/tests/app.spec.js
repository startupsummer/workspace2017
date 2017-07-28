const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen())
const { should } = require('chai')

const writeStaff = require('resources/staff/staff.service.js')
const writeTasks = require('resources/tasks/tasks.service.js')
const { signinAsRoot } = require('./resources/auth.js')
const createUser = require('./resources/staff')
const createTask = require('./resources/tasks')

should()

describe('Authorization admin and 3 task', function() {
  const admin = createUser.admin()
  const user = createUser.user()
  const user2 = createUser.user('password')
  const mandatoryTask = createTask.mandatoryTask()
  const advancedTask = createTask.advancedTask()
  const supperAdvancedTask = createTask.supperAdvancedTask()

  let tokenAdmin;
  let tokenUser;

    before(async () => {
      await writeStaff.write.remove()
      await writeTasks.write.remove()

      await writeStaff.write.create(admin)
      await writeStaff.write.create(user)
      await writeStaff.write.create(user2)
      await writeTasks.write.create(mandatoryTask)
      await writeTasks.write.create(advancedTask)
      await writeTasks.write.create(supperAdvancedTask)

      tokenAdmin = await signinAsRoot(request, admin)
      tokenUser = await signinAsRoot(request, user)
      tokenUser2 = await signinAsRoot(request, user2, 'password')
    })

    it('should return tasks', done => {
         request.get('/api/v1/tasks')
           .set('Authorization', `Bearer ${tokenAdmin}`)
           .expect(200)
           .end(done);
    })

    it('should return chenge first,last name', done => {
     const chengeFirsName = '12312321312'
     const chengeLastName = 'sadasdqwd'

      request.put(`/api/v1/staff/${user._id}`)
       .set('Authorization', `Bearer ${tokenUser}`)
       .send(Object.assign({}, user, {
         firstName: chengeFirsName,
         lastName: chengeLastName,
         password: 'ckkc ftycfvtyucfuyllcf',
        }))
       .expect((resp) => {
         const respFirstName = resp.body.results.value.firstName
         const respLastName = resp.body.results.value.lastName

         chengeFirsName.should.equal(respFirstName)
         chengeLastName.should.equal(respLastName)
       })
       .end(done);
      })

      it(' test that non admin staff can`t update firstname of the another staff.', done => {
        const chengeFirsName = '!!!!!!!!!!!!!!!'
        const chengeLastName = '@@@@@@@@@@@@@@@@@'

        request.put(`/api/v1/staff/${user2._id}`)
         .set('Authorization', `Bearer ${tokenUser }`)
         .send(Object.assign({}, user, {
           firstName: chengeFirsName,
           lastName: chengeLastName,
           password: 'qwerty',
          }))
         .expect(403)
         .end(done);
      })

      it('test that when a non admin staff tries to create a task, he gets an error 403', done => {
        const title = '!!!!!!!!!!!!!!!'
        const description = '@@@@@@@@@@@@@@@@@'

        request.put(`/api/v1/tasks/${mandatoryTask._id}`)
         .set('Authorization', `Bearer ${tokenUser}`)
         .send(Object.assign({}, { title, description }))
         .expect(403)
         .end(done);
      })

      it(' test that admin can successfully update the task, and, as a response, he gets the updated task', done => {
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

      it('test that admin can add any staff to the list of participators of the task', done => {
        const participatorIds = user._id

        request.post(`/api/v1/tasks/${mandatoryTask._id}/participators/${user._id}`)
         .set('Authorization', `Bearer ${tokenAdmin}`)
         .send({ participatorIds })
         .expect((resp) => {
           console.log(resp.body)
           const respParticipatorIds = resp.body.results.value.participatorIds.pop()

           participatorIds.should.equal(respParticipatorIds)
         })
         .end(done);
      })
  });
