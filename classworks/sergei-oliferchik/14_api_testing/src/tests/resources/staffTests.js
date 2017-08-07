const { should } = require('chai')

const writeStaff = require('resources/staff/staff.service.js')
const { signinAsRoot } = require('./auth.js')
const createUser = require('./staff')


should()

const staffTests = request => {
  describe('tests for Staff', function() {
    const admin = createUser.admin()
    const user = createUser.user()
    const user2 = createUser.user('password')

    let tokenAdmin;
    let tokenUser;

    before(async () => {
      await Promise.all([
        writeStaff.write.remove(),
      ])

      await Promise.all([
        writeStaff.write.create(admin),
        writeStaff.write.create(user),
        writeStaff.write.create(user2),

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
    })

    it('non admin staff can successfully update firstname and lastname of the himself', done => {
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

    it('non admin staff can`t update firstname of the another staff.', done => {
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
  });
}

module.exports = staffTests
