const Joi = require('joi')

const settings = require('app.settings')

const schema = {
  email: Joi.string()
    .email(settings.emailOptions)
    .error(new Error('email: Please enter a valid email address'))
    .trim()
    .lowercase(),
  password: Joi.string()
    .required()
    .error(new Error('password: The Password field is required.'))
    .trim()
}

exports.apply = (data) => {
  return Joi.validate(data, schema, settings.joiOptions)
}
