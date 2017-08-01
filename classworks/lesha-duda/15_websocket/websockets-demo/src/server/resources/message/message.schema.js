const Validator = require('jsonschema').Validator;

const validator = new Validator();

const userSchema = {
  id: '/Message',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdOn: { type: 'Date' },
    senderId: { type: 'string' },
    roomId: { type: 'string' },
  },
  required: ['_id', 'createdOn', 'senderId'],
};

module.exports = obj => validator.validate(obj, userSchema);
