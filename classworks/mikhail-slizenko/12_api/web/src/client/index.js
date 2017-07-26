import './index.scss';

const submitBtn = document.querySelector('.js-submit');
const secretBtn = document.querySelector('.js-secret');
const message = document.querySelector('.message');
const form = document.querySelector('.js-form');
const remarks = document.querySelectorAll('.remark');
let token;

const map = f => x => Array.prototype.map.call(x, f);

const showError = (item) => {
  item.classList.add('remark--warning');
  setTimeout(() => item.classList.remove('remark--warning'), 3000);
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const body = {
    email: form.email.value,
    password: form.password.value
  }

  fetch('/signin', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      token
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => token = data.token)
    .catch(() => map(item => showError(item))(remarks))
})

secretBtn.addEventListener('click', (e) => {
  e.preventDefault();

  fetch('/secret', {
    method: 'GET',
    headers: { token }
  })
    .then(data => data.status === 200
      ? message.textContent = 'OK'
      : message.textContent = 'BAD')
})
