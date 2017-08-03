const _ = require('lodash')

const constants = require('app.constants')

/**
 * Works as find, but calculates pages count and total count if page was specified
 *
 * @param model
 * @param query
 * @param options
 * @returns {*}
 */
function find (model, query, options) {
  let skip
  let hasPaging
  let pagesCount
  let projection = query.projection
  delete query.projection
  let mQuery = projection ? model.find(query, projection) : model.find(query)

  _.defaults(options, { limit: constants.PAGINATION.DEFAULT_LIMIT, page: 0, noLimit: false })
  if (options.noLimit) {
    hasPaging = false
    options.limit = 0
  } else {
    hasPaging = options.page > 0
    options.limit = parseInt(options.limit, 10)
  }

  if (hasPaging) {
    skip = (options.page - 1) * options.limit
    mQuery = mQuery.skip(skip).limit(options.limit)
  } else {
    mQuery = mQuery.limit(options.limit)
  }

  if (options.sort) {
    mQuery = mQuery.sort(options.sort)
  }

  return mQuery.toArrayAsync()
    .then((results) => {
      if (!hasPaging) {
        return {
          results: results
        }
      }

      return model.countAsync(query)
        .then((count) => {
          if (options.limit) {
            pagesCount = Math.ceil(count / options.limit) || 1
          }
          return {
            results: results,
            meta: {
              pages: pagesCount,
              total: count
            }
          }
        })
    })
}

module.exports = find
