 
const validate = (ctx, next) => new Promise((resolve, reject) => {
    ctx.checkBody('mail').notEmpty().isEmail()
    ctx.checkBody('pass').notEmpty()
  
    if(ctx.validationErrors()) {
        reject({ message: 'Invalid data', status: 400 })
    } else {
        resolve()
    }
})

module.exports = validate;