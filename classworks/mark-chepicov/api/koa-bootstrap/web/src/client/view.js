import { post } from './api.client';

const $ = require('jquery');

document.forms.summer.onsubmit = (event) => {
  event.preventDefault();
  const form = document.forms.summer;
  post('post-form', null, {
    email: form.email.value,
    password: form.password.value,
  })
  .then((res) => {
    console.dir(res);
    form.style.background = 'none';
    $('.main__text').html('Everything is ok');
    document.querySelector('#forma').style.display = 'none';
    document.querySelector('#login').style.display = 'block';
    if (res.token) {
      localStorage.setItem('token', res.token);
    }
  })
  .catch(() => {
    form.style.background = 'red';
    $('.main__text').html('Wrong email or password');
  });
};

document.querySelector('#login').onclick = (event) => {
  post('access', null, {
    token: localStorage.getItem('token'),
  })
  .then((res) => {
    event.target.style.background = 'green';
    $('.main__text').html('Hello, world');
    document.querySelector('#logout').style.display = 'block';
  })
  .catch(() => {
    event.target.style.background = 'red';
    $('.main__text').html('Something went wrong :/');
  });
};


document.querySelector('#logout').onclick = (event) => {
  post('logout', null, {
    token: localStorage.getItem('token'),
  })
  .then((res) => {
    event.target.style.display = 'none';
    $('.main__text').html('Log in');
    document.querySelector('#login').style.background = 'white';
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#forma').style.display = 'flex';
    localStorage.clear();
  })
  .catch(() => {
    event.target.style.background = 'red';
    $('.main__text').html('Something went wrong :/');
  });
};
