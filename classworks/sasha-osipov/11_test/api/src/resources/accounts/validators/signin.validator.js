const baseValidator = require('resources/base.validator')
const signinSchema = require('./signin.updateSchema')

exports.validate = (ctx) => baseValidator(ctx, async () => {
  let result = signinSchema.apply(ctx.request.body)
  return result
})
