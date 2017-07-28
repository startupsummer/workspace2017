const chai = require('chai')
const supertest = require('supertest');
const app = require('../../../app')
const request = supertest.agent(app.listen())

const { signinAsRoot } = require('../auth')
const { addAdmin, addUser, removeStaff } = require('tests/factory-users')
const { addTask, removeTasks } = require('tests/factory-tasks')

let tokenAdmin, tokenUser, admin, user, userForKill, taskAdmin, taskUser

chai.should()

exports.tasks = () => describe('Tasks', function () {
    beforeEach(async () => {
        admin = await addAdmin()
        user = await addUser()
        userForKill = await addUser()
        taskAdmin = await addTask(admin._id)
        taskUser = await addTask(user._id)
        tokenAdmin = await signinAsRoot(request, admin)
        tokenUser = await signinAsRoot(request, user)
    })
    it('Admin with tasks', done => {
        request.get('/api/v1/tasks')
            .set('Authorization', `Bearer ${ tokenAdmin }`)
            .expect(200)
            .end(done)
    })
    it('Try create a task', done => {
        request.post(`/api/v1/tasks`)
            .set('Authorization', `Bearer ${ tokenUser }`)
            .send(taskUser)
            .expect(403)
            .end(done)
    })
    it('Admin update task', done => {
        taskAdmin.title = `Hello, it's me!`

        request.put(`/api/v1/tasks/${ taskAdmin._id }`)
            .set('Authorization', `Bearer ${ tokenAdmin }`)
            .send(taskAdmin)
            .expect(res => {
                res.body.results.value.title.should.be.equal(taskAdmin.title)
            })
            .end(done)
    })
    it('Admin add new user to task', done => {
        request.post(`/api/v1/tasks/${ taskAdmin._id }/participators/${ user._id }`)
            .set('Authorization', `Bearer ${ tokenAdmin }`)
            .send(taskAdmin)
            .expect(200)
            .end(done)
    })
    it('User try add new user to task', done => {
        request.post(`/api/v1/tasks/${ taskAdmin._id }/participators/${ userForKill._id }`)
            .set('Authorization', `Bearer ${ tokenUser }`)
            .send(taskAdmin)
            .expect(403)
            .end(done)
    })
    afterEach(async () => {
        await removeStaff()
        await removeTasks()
    })
})


