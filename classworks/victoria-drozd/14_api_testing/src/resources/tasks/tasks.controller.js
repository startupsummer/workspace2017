const _ = require('lodash')

const idGenerator = require('lib/mongo/idGenerator')

const tasksService = require('./tasks.service')
const tasksReadService = tasksService.read
const tasksWriteService = tasksService.write
const staffService = require('resources/staff/staff.service').read

const validators = require('./validators')

const errorMessages = require('app.errorMessages')

/**
 * @desc Get task information with additional fields
 * @param {object} task
 * @param {object[]} staffMembers
 * @return {object}
 */
const getTaskFullData = (task, staffMembers) => {
  let result = _.cloneDeep(task)

  let staffMember = staffMembers.find(staffMember =>
    staffMember._id === task.createrId
  ) || {}
  result.createrName = `${staffMember.firstName} ${staffMember.lastName}`

  result.participators = staffMembers
    .filter(staffMember => task.participatorIds.includes(staffMember._id))
    .map(staffMember => ({
      _id: staffMember._id,
      fullName: `${staffMember.firstName} ${staffMember.lastName}`
    }))
  delete result.participatorIds

  return result
}

exports.list = async (ctx, next) => {
  let tasks = await tasksReadService.list(ctx.query)
  let staffIds = []
  tasks.results.forEach(task => {
    staffIds.push(
      task.createrId,
      ...task.participatorIds
    )
  })

  let staff = await staffService.findByIds(staffIds)
  let results = tasks.results.map(task => getTaskFullData(task, staff.results))

  ctx.body = {
    results,
    meta: tasks.meta
  }
}

exports.byId = async (ctx, next) => {
  let task = await tasksReadService.findById(ctx.params.id)
  ctx.assert(task, 404, errorMessages.tasks.notFound)

  let staffIds = [
    task.createrId,
    ...task.participatorIds
  ]
  let staff = await staffService.findByIds(staffIds)

  ctx.body = getTaskFullData(task, staff.results)
}

exports.create = async (ctx, next) => {
  ctx.assert(
    ctx.state.authorization.isAdmin(),
    403, errorMessages.authorization.permission
  )

  let result = await validators.task.validate(ctx)
  ctx.assert(!result.errors, 400)

  let taskData = result.value
  taskData._id = idGenerator.generate()
  taskData.createrId = ctx.state.user._id
  taskData.participatorIds = []
  taskData.imageFileName = null

  let task = await tasksWriteService.create(taskData)
  ctx.body = task
}

exports.update = async (ctx, next) => {
  ctx.assert(
    ctx.state.authorization.isAdmin(),
    403, errorMessages.authorization.permission
  )

  let task = await tasksReadService.findById(ctx.params.id)
  ctx.assert(task, 404, errorMessages.tasks.notFound)

  let result = await validators.task.validate(ctx)
  ctx.assert(!result.errors, 400)

  let taskData = result.value
  let newTask = await tasksWriteService.findAndModify(
    { _id: ctx.params.id },
    {
      $set: {
        title: taskData.title,
        description: taskData.description
      }
    }
  )

  ctx.body = newTask
}

exports.addParticipator = async (ctx, next) => {
  ctx.assert(
    ctx.state.authorization.isAdmin() ||
    ctx.state.user._id !== ctx.params.staffId,
    403, errorMessages.authorization.permission
  )

  let task = await tasksReadService.findById(ctx.params.id)
  ctx.assert(task, 404, errorMessages.tasks.notFound)

  let result = await validators.addParticipator.validate(ctx, task.participatorIds)
  ctx.assert(!result.errors, 400)

  let newTask = await tasksWriteService.findAndModify(
    { _id: ctx.params.id },
    {
      $push: { participatorIds: ctx.params.staffId }
    }
  )

  ctx.body = newTask
}

exports.removeParticipator = async (ctx, next) => {
  ctx.assert(
    ctx.state.authorization.isAdmin() ||
    ctx.state.user._id !== ctx.params.staffId,
    403, errorMessages.authorization.permission
  )

  let task = await tasksReadService.findById(ctx.params.id)
  ctx.assert(task, 404, errorMessages.tasks.notFound)

  let result = await validators.removeParticipator.validate(ctx, task.participatorIds)
  ctx.assert(!result.errors, 400)

  let newTask = await tasksWriteService.findAndModify(
    { _id: ctx.params.id },
    {
      $pull: { participatorIds: ctx.params.staffId }
    }
  )

  ctx.body = newTask
}
