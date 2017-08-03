const signin = (request, user) => {
  return new Promise((resolve, reject) => {
    request.post('/api/v1/accounts/signin')
      .send({
        email: user.email,
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

exports.signinAsRoot = (request, user) => {
  return signin(request, user)
}
