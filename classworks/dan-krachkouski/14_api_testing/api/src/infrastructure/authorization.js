class Authorization {
  constructor (user) {
    this.data = user
  }

  isAdmin () {
    return this.data.isAdmin
  }
}

module.exports = Authorization
