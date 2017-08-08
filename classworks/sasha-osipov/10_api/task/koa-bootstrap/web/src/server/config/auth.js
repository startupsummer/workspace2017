const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const users = require('./db')

const auth = (ctx, next) => new Promise((resolve, reject) => {

    let pass = ctx.request.body.pass
    let mail = ctx.request.body.mail
    let hashPass = passwordHash.generate(pass)

    const newUser = {
        mail,
        pass: hashPass,
    }

    let findUser = users.find(item => item.mail === mail)

    let token = jwt.sign(findUser || newUser, 'vape', { expiresIn: '10sec' })

    if (!findUser) {
        users.push(newUser)
        ctx.body = { token }
        resolve()
    } else if(findUser && passwordHash.verify(ctx.request.body.pass, findUser.pass)) {
        ctx.body = { token }
        resolve()
    } else {
        reject({ message: 'Auth fails', status: 400 })
    }
})

module.exports = auth