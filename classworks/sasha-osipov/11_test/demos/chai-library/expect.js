const chai = require('chai')

let expect = chai.expect

let foo = 'bar'
expect(foo).to.be.a('string')
expect(foo).to.equal('bar')
expect(foo).to.have.lengthOf(3)

let tea = {
  flavors: 'tea'
}
expect(tea).to.have.property('flavors').with.lengthOf(3)