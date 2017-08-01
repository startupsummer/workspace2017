const _ = require('lodash');
const BaseQueryService = require('./baseQuery.service');
const idGenerator = require('./idGenerator');
const MongoServiceError = require('./MongoServiceError');

class BaseService extends BaseQueryService {
  constructor(collection, options) {
    super(collection, options || {});

    this.logger = global.logger || console;
  }

  _validateSchema(entity) {
    if (this._options.validateSchema) {
      const validationResult = this._options.validateSchema(entity);
      if (validationResult.errors && validationResult.errors.length > 0) {
        console.error('Schema invalid', JSON.stringify(validationResult.errors, 0, 4));
        throw new MongoServiceError(
          MongoServiceError.INVALID_SCHEMA,
          `Document schema is invalid: ${JSON.stringify(validationResult.errors)}`,
        );
      }
    }
  }

  /**
  * Insert one object or array of the objects to the database
  * Publishes `created` event {doc}
  * Sets createdOn to the current date
  *
  * @param {array | object} Object or array of objects to create
  * @return {array | object} Object or array of created objects
  **/
  create(objs) {
    let entities = objs;
    if (!_.isArray(entities)) {
      entities = [entities];
    }

    entities.forEach((item) => {
      const entity = item;
      if (!entity._id) {
        entity._id = idGenerator.generate();
      }
      entity.createdOn = new Date();

      this._validateSchema(entity);
    });

    return this._collection.insert(entities)
      .then(() => {
        entities.forEach((doc) => {
          this.emit('created', {
            doc,
          });
        });

        return entities.length > 1 ? entities : entities[0];
      });
  }

  generateId() {
    return idGenerator.generate();
  }

  /**
  * Modifies entity found by query in the database
  * Publishes `updated` event {doc, prevDoc}
  * Sets updatedOn to the current date
  *
  * @param query {Object} - mongo search query
  * @param updateFn {function(doc)} - function, that recieves document to be updated
  * @param options {Object} - mongodb update options (http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#update)
  * @return {Object} Updated object
  **/
  update(query, updateFn, options) {
    return this.findOne(query, options)
      .then((d) => {
        let doc = d;
        if (!d) {
          throw new MongoServiceError(
            MongoServiceError.NOT_FOUND,
            `Document not found while updating. Query: ${JSON.stringify(query)}`,
          );
        }
        const prevDoc = _.cloneDeep(doc);
        doc.updatedOn = new Date();
        let update;
        if (_.isFunction(updateFn)) {
          updateFn(doc);
          this._validateSchema(doc);
          update = this._collection.update({ _id: doc._id }, doc);
        } else {
          update = this._collection.update(query, updateFn);
          const docId = doc._id;
          doc = update.then(() => this.findOne({ _id: docId }));
        }
        return Promise.all([
          update,
          doc,
          prevDoc,
        ]);
      })
      .then((data) => {
        this.emit('updated', {
          doc: data[1],
          prevDoc: data[2],
        });

        return data[1];
      });
  }

  updateAll(query, update) {
    return this._collection.update(query, update, { multi: true })
      .then(() => this._collection.find(query))
      .then((data) => {
        this.emit('updatedAll', {
          data,
        });

        return data;
      });
  }

  /**
  * Remove one or many documents found by query
  *
  * @param query {Object} - mongodb search query
  **/
  remove(query) {
    let removed;
    return this.find(query)
      .then(docsForRemove => (
        removed = docsForRemove
      ))
      .then(this._collection.remove(query))
      .then(() => {
        this.emit('removed', {
          docs: removed.result,
        });
      });
  }

  /**
  * Create or check index existence, omits error
  *
  * @param index {Object} - index to be created
  * @param options {Object} - index options
  */
  ensureIndex(index, options) {
    return this._collection.ensureIndex(index, options)
      .catch((err) => {
        this.logger.warn(err);
      });
  }

  /**
   * Use only to update denormalized data,
   * this method does not emit reactive events (created, updated)
   * to avoid circular updateAsync
   *
   * @param query {Object} - mongo search query
   * @param updateFn {function(doc)} - function, that recieves document to be updated
   * @param options {Object} - mongodb update options (http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#update)
   **/
  atomicUpdate(query, update, options = {}) {
    return this._collection.update(query, update, options);
  }

  createOrUpdate(query, updateFn) {
    return this.exists(query)
      .then((exists) => {
        if (exists) {
          return this.update(query, updateFn);
        }
        const doc = query;
        updateFn(doc);
        return this.create(doc);
      });
  }

  findOneAndUpdate(query, update, options = { returnOriginal: false }) {
    let originalDoc;
    return this.findOne(query)
      .then((doc) => {
        originalDoc = doc;

        return this._collection.findOneAndUpdate(query, update, options);
      })
      .then((doc) => {
        if (originalDoc) {
          this.emit('updated', {
            doc,
            prevDoc: originalDoc,
          });
        } else {
          this.emit('created', {
            doc,
          });
        }

        return doc;
      });
  }

  atomicFindOneAndUpdate(query, update, options) {
    return this._collection.findOneAndUpdate(query, update, options);
  }

  /**
   * Deep compare doc & prevDoc from 'updated' event. When
   * something changed - executes callback
   *
   * @param  {Array|Object} properties - see _deepCompare
   * @param  {Function} callback - executes callback if something changed
   */
  onPropertiesUpdated(properties, callback) {
    const self = this;
    return this.on('updated', (evt) => {
      const data = evt.doc;
      const initialData = evt.prevDoc;
      const isChanged = self._deepCompare(data, initialData, properties);
      if (isChanged) {
        callback(data);
      }
    });
  }

  /**
   * Deep compare data & initialData. When
   * something changed - executes callback
   *
   * @param  {Array|Object} properties
   * 1) Array of properties to compare. For example: ['user.firstName', 'companyId']
   * 2) Object of properties {'user.firstName': 'John'} - will check if property changed and equal
   * to 'John' in updated document.
   * Note: . (dot) is used to compare deeply nested properties
   * @return {Boolean} - indicates if something has changed
   */
  _deepCompare(data, initialData, properties) {
    let changed = false;

    if (Array.isArray(properties)) {
      changed = _.find(properties, (prop) => {
        const value = _.get(data, prop);
        const initialValue = _.get(initialData, prop);

        return !_.isEqual(value, initialValue);
      }) !== undefined;
    } else {
      Object.keys(properties).forEach((prop) => {
        if (changed) {
          return;
        }
        const value = _.get(data, prop);
        const initialValue = _.get(initialData, prop);

        if ((value === properties[prop])
          && (initialValue !== properties[prop])) {
          changed = true;
        }
      });
    }

    return changed;
  }
}

module.exports = BaseService;
