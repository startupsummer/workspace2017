import './index.scss';
import './iLoveJs.scss';
import './footer.scss';
import './summer-form.scss';
import $ from 'jquery';

import { getYear } from './getYear.js';
import { getWhyILove } from './getWhyILove.js';
// import { onSubmitSummerForm } from './summer-form';

import * as clientApi from './api.client';

$('#main-footer__year').append(getYear());
$('.main-block__message').append(`...because ${getWhyILove()}`);

let token = 12;

document.getElementById('reg-btn').onclick = () => {
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  fetch(
    'http://localhost:3001/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  ).then(resp => resp.json())
  .then((respData) => {
    if (respData.status === 'OK')
    document.getElementById("auth-btn").disabled = false;
  });
};


document.getElementById('auth-btn').onclick = () => {
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  fetch(
    'http://localhost:3001/authorization',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  ).then(resp => resp.json())
  .then((respData) => {
    if ('token' in respData) {
      token = respData.token;
      document.getElementById("show-button").disabled = false;
    }
  });
};

// document.querySelector('.show-button').onclick = () => {
//   fetch(
//     'secret-info',
//     {
//       method: 'GET',
//       headers: token,
//     },
//   ).then();
// };

document.querySelector('.show-button').onclick = () => {
  console.log(token);
  fetch(
    'http://localhost:3001/secret-info',
    {
      method: 'POST',
      headers: { token: token },
      body: JSON.stringify({ key: 'hi' }),
    },
  )
  .then(resp => resp.json())
  .then((respData) => {
    if ('data1' in respData) {
      document.getElementById("secret-data").textContent += `Secret data: ${respData.data1} ${respData.data2}`;
    } else {
      document.getElementById("secret-data").textContent += `${respData.status}: ${respData.message}`;
    }
  });

};

// document.querySelector('.show-button').onclick = () => {
//   clientApi.post('secret-info', null, {key: 'hi'}).then();
// };
