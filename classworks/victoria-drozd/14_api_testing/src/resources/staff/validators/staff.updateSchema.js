const Joi = require('joi')
const _ = require('lodash')

const settings = require('app.settings')

const schema = {
  _id: Joi.string(),
  email: Joi.string().email(settings.emailOptions),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  isAdmin: Joi.boolean().default(false)
}

exports.apply = (ctx, data) => {
  let extendedData = _.cloneDeep(data)
  extendedData._id = ctx.params.id

  return Joi.validate(extendedData, schema, settings.joiOptions)
}
