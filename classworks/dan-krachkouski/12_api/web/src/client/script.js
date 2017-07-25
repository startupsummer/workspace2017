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
  // localStorage.clear()
  // document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  // eslint-disable-next-line
  alert('How do i delete a cookie?')
}
