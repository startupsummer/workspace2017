const BaseService = require('./base.service');
const BaseQueryService = require('./baseQuery.service');
const monk = require('monk');

const logger = global.logger || console;

/**
* Inits connection with mongodb, manage reconnects, create factory methods
*
* @return {Object} with a factory method {createService}, that creates a
* mongodb service
**/
const init = (connectionString) => {
  // options docs: http://mongodb.github.io/node-mongodb-native/2.1/reference/connecting/connection-settings/
  const db = monk(connectionString, {
    connectTimeoutMS: 20000,
  });

  db.on('error-opening', (err) => {
    logger.error(err, 'Failed to connect to the mongodb on start');
    throw err;
  });

  db.on('open', () => {
    logger.info(`Connected to mongodb: ${connectionString}`);
  });

  db.on('close', (err) => {
    if (err) {
      logger.error(err, `Lost connection with mongodb: ${connectionString}`);
    } else {
      logger.warn(`Closed connection with mongodb: ${connectionString}`);
    }
  });

  db.on('connected', (err) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(`Connected to mongodb: ${connectionString}`);
    }
  });

  db.createService = function createService(collectionName, validateSchema, options = {}) {
    const opt = options;
    if (validateSchema) {
      opt.validateSchema = validateSchema;
    }

    const collection = db.get(collectionName, { castIds: false });
    return new BaseService(collection, opt);
  };

  db.createQueryService = function createService(collectionName) {
    const collection = db.get(collectionName, { castIds: false });
    return new BaseQueryService(collection);
  };

  return db;
};

module.exports = init;
