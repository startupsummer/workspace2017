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
    })
    .catch(() => {
      document.forms.loginForm.style.background = '#ffe0e0'
    })
}

document.querySelector('#test-access').onclick = (event) => {
  // eslint-disable-next-line
  axios.post('/access')
    .then(res => {
      event.target.style.background = 'green'
    })
    .catch(() => {
      event.target.style.background = 'red'
    })
}

document.querySelector('#log-out').onclick = (event) => {
  // eslint-disable-next-line
  axios.delete('/auth')
}
