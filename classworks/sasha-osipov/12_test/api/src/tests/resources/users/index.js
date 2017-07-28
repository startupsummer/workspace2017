const chai = require('chai')
const supertest = require('supertest');
const app = require('../../../app')
const request = supertest.agent(app.listen())

const { signinAsRoot } = require('../auth')
const { addUser, removeStaff } = require('tests/factory-users')

let tokenUser, user, userForKill

chai.should()

exports.users = () => describe('Users', function() {
    beforeEach(async () => {
        user = await addUser()
        userForKill = await addUser()
        tokenUser = await signinAsRoot(request, user)
    })
    it('Update himself', done => {
        user.firstName = 'Lol'
        user.password = '228'

        request.put(`/api/v1/staff/${ user._id }`)
            .set('Authorization', `Bearer ${ tokenUser }`)
            .send(user)
            .expect(200)
            .end(done)
    })
    it('Update other user', done => {
        userForKill.firstName = 'kek'
        userForKill.password = '12345' 
        
        request.put(`/api/v1/staff/${ userForKill._id }`)
            .set('Authorization', `Bearer ${ tokenUser }`)
            .send(userForKill)
            .expect(403)
            .end(done)
    })
    afterEach(async () => {
        await removeStaff()
    }) 
})