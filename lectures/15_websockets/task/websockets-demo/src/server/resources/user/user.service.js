const db = require('db');
const schema = require('./user.schema');

const service = db.createService('user', schema);
const securityUtil = require('security.util');


service.markEmailAsVerified = (_id) => {
  return service.update({
    _id,
  }, (doc) => {
    const userDoc = doc;
    userDoc.isEmailVerified = true;
  });
};

service.updateResetPasswordToken = (_id, token) => {
  return service.update({ _id }, {
    $set: {
      resetPasswordToken: token,
    },
  });
};

service.updatePassword = async function updatePassword(_id, newPassword) {
  const salt = await securityUtil.generateSalt();
  const hash = await securityUtil.getHash(newPassword, salt);

  return service.update({
    _id,
  }, (doc) => {
    const userDoc = doc;
    userDoc.passwordHash = hash;
    userDoc.passwordSalt = salt;
  });
};

service.updateEmail = (_id, newEmail) => {
  return service.update({
    _id,
  }, (doc) => {
    const userDoc = doc;
    userDoc.email = newEmail;
  });
};

module.exports = service;
