import './index.scss';

const submitBtn = document.querySelector('.js-submit');
const secretBtn = document.querySelector('.js-secret');
const message = document.querySelector('.message');
const form = document.querySelector('.js-form');
const remark = document.querySelectorAll('.remark');

const map = f => x => Array.prototype.map.call(x, f);

let token;

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
    .catch(() => map(item => item.classList.add('remark--warning'))(remark))
})

secretBtn.addEventListener('click', (e) => {
  e.preventDefault();

  fetch('/secret', {
    method: 'GET',
    headers: { token }
  })
    .then(data => data.status === 200
      ? message.textContent = 'OK'
      : message.textContent = 'Authorized ples')
})
