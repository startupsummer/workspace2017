const StaffBuilder = require('./staff.builder')
const staffService = require('../../../resources/staff/staff.service')
const staffWriteService = staffService.write

exports.admin = () => {
  let staffBuilder = new StaffBuilder()
  let user = staffBuilder
    .admin()
    .personalInfo()
    .email()
    .build()


  return staffWriteService.create(user)
}

exports.client = () => {
  let staffBuilder = new StaffBuilder()
  let user = staffBuilder
    .client()
    .personalInfo()
    .email()
    .build()

  return staffWriteService.create(user)
}
