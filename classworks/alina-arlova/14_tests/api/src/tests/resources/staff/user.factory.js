const userBuilder = require('./user.builder.js');
const database = require('../../../resources/staff/staff.service.js');

exports.admin = () => {
  let builder = new userBuilder();
  let user = builder
    .getId()
    .admin()
    .email()
    .firstName()
    .lastName()
    .passwordHash()
    .build()

  return user;
}

exports.client = () => {
  let builder = new userBuilder();
  let user = builder
    .getId()
    .client()
    .email()
    .firstName()
    .lastName()
    .passwordHash()
    .build()

  return user;
}
