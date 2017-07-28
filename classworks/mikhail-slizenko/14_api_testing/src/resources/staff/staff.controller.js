const errorMessages = require('app.errorMessages')

const staffService = require('./staff.service')
const staffReadService = staffService.read
const staffWriteService = staffService.write

const validators = require('./validators')

const idGenerator = require('lib/mongo/idGenerator.js')

exports.byId = async (ctx, next) => {
  ctx.assert(
    ctx.state.authorization.isAdmin() ||
    ctx.state.user._id !== ctx.params.id,
    403, errorMessages.authorization.permission
  )

  let staff = await staffReadService.findById(ctx.params.id)
  ctx.assert(staff, 404, errorMessages.staff.notFound)

  ctx.body = staff
}

exports.create = async (ctx, next) => {
  ctx.assert(
    ctx.state.authorization.isAdmin(),
    403, errorMessages.authorization.permission
  )

  let result = await validators.staff.validate(ctx)
  ctx.assert(!result.errors, 400)

  let staffData = result.value
  staffData._id = idGenerator.generate()

  let staff = await staffWriteService.create(staffData)
  ctx.body = staff
}

exports.update = async (ctx, next) => {
  ctx.assert(
    ctx.state.authorization.isAdmin() ||
    ctx.state.user._id === ctx.params.id,
    403, errorMessages.authorization.permission
  )

  let result = await validators.staff.validate(ctx)
  ctx.assert(!result.errors, 400)

  let staffData = result.value

  let newStaff = await staffWriteService.findAndModify(
    { _id: ctx.params.id },
    {
      $set: {
        email: staffData.email,
        passwordHash: staffData.passwordHash,
        firstName: staffData.firstName,
        lastName: staffData.lastName
      }
    }, null, 
    { new: true }
  )

  ctx.body = newStaff
}
