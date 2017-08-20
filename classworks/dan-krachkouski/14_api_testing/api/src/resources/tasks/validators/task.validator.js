const baseValidator = require('resources/base.validator')
const taskSchema = require('./task.updateSchema')

exports.validate = (ctx) => baseValidator(ctx, () => {
  let result = taskSchema.apply(ctx, ctx.request.body)
  return result
})
