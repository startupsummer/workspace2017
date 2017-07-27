const signin = (request, user, password) => {
  return new Promise((resolve, reject) => {
    request.post('/api/v1/accounts/signin')
      .send({
        email: user.email,
        password: password
      })
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.body.token)
      })
  })
}

exports.signinAsRoot = function (request, user, password) {
  return signin(request, user, password)
}
