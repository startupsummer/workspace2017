const faker = require('Faker')

class Builder {
  constructor ()  {
    this.data = {}
  }

  organizationAdministration () {
    this.data.roles = [100, 101, 20, 30]
    return this
  }

  admin () {
    this.data.roles = [100, 20, 30]
    return this
  }

  therapist () {
    this.data.roles = [20, 30]
    return this
  }

  biller () {
    this.data.roles = [20]
    return this
  }

  allPermissions () {
    let permissions = {
      permissions: {
        canSeeReferrals: true,
        canBillInsurance: false,
        canDeleteClients: true,
        canSeeOnlyAssignedClients: false,
        canUploadGeneralDocuments: true,
        canAssignStaff: true
      }
    }
    this.data.permissions = permissions
    return this
  }

  root () {
    this.data.email = `root${Date.now()}@root.root`
    return this
  }

  email (email) {
    this.data.email = email || faker.Internet.email().toLowerCase()
    return this
  }

  build () {
    return this.data
  }
}

module.exports = Builder
