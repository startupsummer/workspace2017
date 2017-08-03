const baseValidator = require('resources/base.validator')
const staffSchema = require('./staff.updateSchema')

const cryptoHelper = require('infrastructure/helpers').crypto

exports.validate = (ctx) => baseValidator(ctx, () => {
  let result = staffSchema.apply(ctx, ctx.request.body)
  if (result.error) {
    return result
  }

  let staffData = result.value

  staffData.passwordHash = cryptoHelper.getHash(staffData.password)
  delete staffData.password

  return result
})
