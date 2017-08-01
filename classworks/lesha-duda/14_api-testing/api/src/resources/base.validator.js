const errorRegExp = /(^[^:\s]+):\s?(.+)/

/**
 *  Validate request and send 400(bad request), when request is not valid
 */
module.exports = async function (koa, validateFn) {
  koa.errors = []
  let data = await validateFn(koa)
  let result = {
    errors: null,
    value: {}
  }

  if (data.error && data.error.details instanceof Array) {
    result.errors = data.error.details.map(error => {
      let pathLastPart = error.path.slice(error.path.length - error.context.key.length)

      if (pathLastPart === error.context.key) {
        return { [error.path]: error.message }
      } else {
        return { [error.context.key]: error.message }
      }
    })
  } else if (data.error instanceof Error) {
    let match = data.error.message.match(errorRegExp)
    let name = match ? match[1] : data.error.name
    let message = match ? match[2] : data.error.message

    result.errors = [{ [name]: message }]
  }

  if (typeof data === 'object' && data.value) {
    result.value = data.value
  }

  if (koa.errors instanceof Array) {
    if (koa.errors.length) {
      result.errors = result.errors || []
      result.errors.push(...koa.errors)
    }
  } else {
    result.errors = koa.errors
  }
  if (result.errors) {
    koa.status = 400
    koa.body = { errors: result.errors }
  }

  return result
}
