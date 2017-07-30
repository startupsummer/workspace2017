const _ = require('lodash')

let BaseQueryService = require('./baseQuery.service')
let idGenerator = require('./idGenerator')

class BaseService extends BaseQueryService {
  constructor (logger, collection, options) {
    super(collection, options || {})

    this.logger = logger
  }

  create (entities) {
    if (!_.isArray(entities)) {
      entities = [entities]
    }

    entities.forEach((entity) => {
      if (!entity._id) {
        entity._id = idGenerator.generate()
      }

      if (this._options.validateSchema) {
        let validationResult = this._options.validateSchema(entity)
        if (validationResult.errors && validationResult.errors.length > 0) {
          throw new Error(`Document schema is invalid: ${JSON.stringify(validationResult.errors)}`)
        }
      }
    })

    return this._collection.insertAsync(entities)
      .then((data) => {
        entities.forEach((doc) => {
          this.emit('created', {
            doc: doc
          })
        })

        return entities.length > 1 ? entities : entities[0]
      })
  }

  update (query, updateFn, options) {
    return this.findOne(query, options)
      .then((doc) => {
        if (!doc) {
          throw new Error(`Document is not found while updating. Query: ${JSON.stringify(query)}`)
        }

        let prevDoc, updatedDoc

        prevDoc = _.cloneDeep(doc)
        updateFn(doc)
        if (doc.updatedAt) {
          doc.updatedAt = new Date()
        }
        updatedDoc = doc

        if (this._options.validateSchema) {
          let validationResult = this._options.validateSchema(updatedDoc)
          if (validationResult.errors && validationResult.errors.length > 0) {
            throw new Error(`Document schema is invalid: ${JSON.stringify(validationResult.errors)}`)
          }
        }

        return Promise.all([
          this._collection.updateAsync({ _id: doc._id }, doc),
          updatedDoc,
          prevDoc
        ])
      })
      .then((data) => {
        this.emit('updated', {
          doc: data[1],
          prevDoc: data[2]
        })

        return data[1]
      })
  }

  findAndModify (query, updateQuery, sort, options) {
    sort = sort || {}

    let defaultOptions = { new: true }
    let resultOptions = _.merge(defaultOptions, options)
    return this._collection.findAndModifyAsync(query, sort, updateQuery, resultOptions)
      .then(res => {
        this.emit('updated', {
          doc: res
        })
        return { results: res }
      })
  }

  remove (query) {
    return this._collection.removeAsync(query)
  }

  ensureIndex (index, options) {
    this._collection.createIndex(index, options, (err) => {
      this.logger.error(err)
    })
  }

  /**
   * Use only to update denormalized data, this method does not emit reactive events
   **/
  atomicUpdate (query, update, options) {
    options = options || {}
    return this._collection.updateAsync(query, update, options)
  }
}

module.exports = BaseService
