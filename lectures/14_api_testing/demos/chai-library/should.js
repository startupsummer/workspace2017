const chai = require('chai')

chai.should()

let foo = 'bar'
foo.should.be.a('string')
foo.should.equal('bar')
foo.should.have.lengthOf(3)

let tea = {
  flavors: 'tea'
}
tea.should.have.property('flavors').with.lengthOf(3)
