const service = require('api/src/db').createService('hello');

service.createHello = (data) => {
  const { name } = data;

  return service.create({ name });
};

module.exports = service;
