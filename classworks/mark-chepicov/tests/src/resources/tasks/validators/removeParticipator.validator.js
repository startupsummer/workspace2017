const baseValidator = require('resources/base.validator')

exports.validate = (ctx, participatorIds) => baseValidator(ctx, () => {
  if (!participatorIds.includes(ctx.params.staffId)) {
    ctx.errors.push({ staff: 'Staff member is not in the list.' })
    return false
  }

  return {}
})
