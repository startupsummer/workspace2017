const chai = require('chai')

const { signinAsRoot } = require('../auth')
const { addUser, removeStaff } = require('tests/factory-users')

let tokenUser, user, userForKill

chai.should()

exports.users = (request) => describe('Users', function() {
    beforeEach(async () => {
        user = await addUser()
        userForKill = await addUser()
        tokenUser = await signinAsRoot(request, user)
    })
    it('Should return updated name and password for user', done => {
        user.firstName = 'Lol'
        user.password = '228'

        request.put(`/api/v1/staff/${ user._id }`)
            .set('Authorization', `Bearer ${ tokenUser }`)
            .send(user)
            .expect(200)
            .end(done)
    })
    it('Should return error when user try update other user', done => {
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