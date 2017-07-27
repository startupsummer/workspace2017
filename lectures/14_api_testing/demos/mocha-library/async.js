const chai = require('chai')

chai.should()

let db = {
  users: [],
  save: (usersList) => {
    console.log('save')
    this.users.push(...usersList)
  },
  find: () => {
    console.log('find')
    return this.users
  },
  clear: () => {
    console.log('clear')
    this.users = []
    return Promise.resolve()
  }
}

beforeEach(() => {
  return db.clear()
    .then(() => {
      return db.save(['tobi', 'loki', 'jane'])
    })
})

describe('#find()', () => {
  it('respond with matching records', () => {
    return db.find({ type: 'User' }).length.should.be.equal(3)
  })
})
