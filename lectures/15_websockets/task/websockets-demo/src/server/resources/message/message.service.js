const db = require('db');
const schema = require('./message.schema');

module.exports = db.createService('message', schema);
