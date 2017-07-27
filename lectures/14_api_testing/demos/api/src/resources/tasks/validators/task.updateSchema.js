const Joi = require('joi')
const _ = require('lodash')

const settings = require('app.settings')

const schema = {
  _id: Joi.string(),
  title: Joi.string().required(),
  description: Joi.string().allow('')
}

exports.apply = (ctx, data) => {
  let extendedData = _.cloneDeep(data)
  extendedData._id = ctx.params.id

  return Joi.validate(extendedData, schema, settings.joiOptions)
}
