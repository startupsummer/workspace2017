const signin = (request, user, pass) => {
  return new Promise((resolve, reject) => {
    request.post('/api/v1/accounts/signin')
      .send({
        email: user.email,
        password: pass || 'qwerty'
      })
      .end((err, res) => {
        if (err) {
          return reject(err)
        }

        resolve(res.body.token)
      })
  })
}

exports.signinAsRoot = signin
