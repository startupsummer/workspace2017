let pagedFind = require('./pagedFind')
let EventEmitter = require('events').EventEmitter
let pluralize = require('pluralize')

class BaseQueryService extends EventEmitter {
  constructor (collection, options) {
    super()
    this._collection = collection
    this._options = options || {}
    // assumes that name passed in a plural form
    this._options.singularName = pluralize.singular(this._options.name)
  }

  get name () {
    return this._options.name
  }

  get singularName () {
    return this._options.singularName
  }

  find (query, options) {
    options = options || {}

    return pagedFind(this._collection, query, options)
  }

  /**
  * Format data return by the find/findOne methods
  * Singular resources returned as {client: {}}
  * Plural resources returned as {client: {}, meta: {pages, total}}
  **/
  formatApiResponse (dbResult) {
    let response = {}
    if (dbResult instanceof Array) {
      response.meta = {}
      response[this.name()] = dbResult
    // list response always have results array
    } else if (dbResult.results instanceof Array) {
      response.meta = dbResult.meta || {}
      response[this.name()] = dbResult.results
    } else {
      response[this.singularName()] = dbResult
    }

    return response
  }

  findOne (query, options) {
    return this.find(query, options)
      .then((data) => {
        if (data.results.length > 1) {
          throw new Error(`findOne: More than one document return for query ${query}`)
        }
        return data.results.length === 1 ? data.results[0] : null
      })
  }

  count (query, options) {
    return this._collection.countAsync(query)
  }

  exists (query, options) {
    return this.count(query)
      .then((count) => {
        return count > 0
      })
  }

  aggregate (query) {
    return this._collection.aggregateAsync(query)
  }

  findByIds (ids, projection) {
    if (ids.length) {
      let clientsQuery = {
        _id: { $in: ids },
        projection
      }
      return this.find(clientsQuery, { noLimit: true })
    } else {
      return {
        results: []
      }
    }
  }

  findById (id, projection) {
    let caseQuery = {
      _id: id,
      projection
    }
    return this.findOne(caseQuery)
  }
}

module.exports = BaseQueryService
