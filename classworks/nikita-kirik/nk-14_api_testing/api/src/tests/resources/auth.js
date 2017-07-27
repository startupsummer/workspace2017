const signin = (request, user) => {
  return new Promise((resolve, reject) => {
    request.post('/api/v1/accounts/signin')
      .send({
        email: user.email.toLowerCase(),
        password: 'qwerty'
      })
      .end((err, res) => {
        if (err) {
          return reject(err)
        }

        resolve(res.body.token)
      })
  })
}

exports.signinAsRoot = function (request, user) {
  return signin(request, user)
}
