const asyncBusboy = require('async-busboy')
const isImage = require('is-image')

const idGenerator = require('lib/mongo/idGenerator')

const errorMessages = require('app.errorMessages')

const filesConstants = require('./files.constants')

const helpers = require('infrastructure/helpers')

const tasksService = require('../tasks.service')
const tasksReadService = tasksService.read
const tasksWriteService = tasksService.write

const extensionRegExp = /(\.[^.]+)$/

exports.getFile = async (ctx, next) => {
  let task = await tasksReadService.findById(ctx.params.id)
  ctx.assert(task, 404, errorMessages.tasks.notFound)
  ctx.assert(task.fileFileName, 404, errorMessages.tasks.fileNotFound)

  let result = await helpers.amazonS3.downloadFile(
    task.fileFileName, filesConstants.S3_FILES_FOLDER
  )
  ctx.assert(!result.error, 400, result.error)

  let data = result.value

  ctx.set('Content-disposition', 'inline')
  ctx.set('Content-type', data.ContentType)
  ctx.body = data.Body
}

exports.updateFile = async (ctx, next) => {
  ctx.assert(
    ctx.state.authorization.isAdmin(),
    403, errorMessages.authorization.permission
  )

  let task = await tasksReadService.findById(ctx.params.id)
  ctx.assert(task, 404, errorMessages.tasks.notFound)

  if (task.fileFileName) {
    // delete avatar from the amazon s3
    await helpers.amazonS3.deleteFile(task.fileFileName)
  }

  let data = await asyncBusboy(ctx.req)
  let stream = data.files[0]
  ctx.assert(stream, 400)

  let fileId = idGenerator.generate()
  let originalFileName = stream.filename.replace(/"/g, '')
  let match = originalFileName.match(extensionRegExp)
  let extension = match ? match[0] : ''
  ctx.assert(isImage(originalFileName), 400)

  let generatedFileName = `${fileId}${extension}`
  let result = await helpers.amazonS3.uploadFile(
    generatedFileName, stream, filesConstants.S3_FILES_FOLDER
  )
  ctx.assert(!result.error, 400, result.error)

  let newTask = await tasksWriteService.findAndModify(
    { _id: ctx.params.id },
    {
      $set: { fileFileName: generatedFileName }
    }
  )

  ctx.body = newTask
}

exports.deleteFile = async (ctx, next) => {
  let task = await tasksReadService.findById(ctx.params.id)
  ctx.assert(task, 404, errorMessages.tasks.notFound)
  ctx.assert(task.fileFileName, 404, errorMessages.tasks.fileNotFound)

  let result = await helpers.amazonS3.deleteFile(task.fileFileName, filesConstants)
  console.dir(result)

  ctx.assert(!result.error, 400, result.error)

  let newTask = await tasksWriteService.findAndModify(
    { _id: ctx.params.id },
    {
      $set: { fileFileName: null }
    }
  )

  ctx.body = newTask
}
