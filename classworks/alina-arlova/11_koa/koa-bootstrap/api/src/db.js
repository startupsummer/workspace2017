const mongo = require('lib/mongo');
const config = require('api/config');

module.exports = mongo(config.mongo.connectionString);
