document.forms.loginForm.onsubmit = (event) => {
  event.preventDefault()
  const form = document.forms.loginForm
  const data = {
    login: form.login.value,
    password: form.password.value
  }

  // eslint-disable-next-line
  axios.post('/auth', data)
    .then(res => {
      document.forms.loginForm.style.background = '#e0ffe6'
      // eslint-disable-next-line
      localStorage.setItem('jwt_token', res.data.token)
    })
    .catch(() => {
      document.forms.loginForm.style.background = '#ffe0e0'
      // eslint-disable-next-line
      localStorage.clear()
    })
}

document.querySelector('#test-acess').onclick = (event) => {
  const token = {
    // eslint-disable-next-line
    token: localStorage.getItem('jwt_token')
  }
  // eslint-disable-next-line
  axios.post('/acess', token)
    .then(res => {
      event.target.style.background = 'green'
    })
    .catch(() => {
      event.target.style.background = 'red'
    })
}

document.querySelector('#log-out').onclick = (event) => {
  // eslint-disable-next-line
  localStorage.clear()
}
