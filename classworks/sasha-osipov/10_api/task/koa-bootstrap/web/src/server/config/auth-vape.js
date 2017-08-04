const jwt = require('jsonwebtoken')

const authVape = (ctx, next) => new Promise((resolve, reject) => {
    try {
        let token = ctx.request.headers.token

        let userData = jwt.verify(token, 'vape')

        resolve()
    }
    catch (err) {
        reject()
    }
})

module.exports = authVape