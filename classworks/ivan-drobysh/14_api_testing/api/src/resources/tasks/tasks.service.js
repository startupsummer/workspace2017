const constants = require('app.constants')
const documents = constants.DATABASE_DOCUMENTS

const readDb = require('read.db')

let readService = readDb.createQueryService(documents.VIEWS.TASKS)
let writeService = readDb.createService(documents.VIEWS.TASKS)

/**
 * Return list of users with pagination
 * @param {Object} queryParams
 * @return {Promise}
 */
readService.list = (queryParams) => {
  let query = {}

  let options = {
    page: queryParams.page || 1,
    limit: parseInt(queryParams.limit) || constants.PAGINATION.DEFAULT_LIMIT
  }

  return readService.find(query, options)
}

exports.read = readService
exports.write = writeService
