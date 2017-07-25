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

document.querySelector('.summer-form__button').onclick = () => {
  // const data = {
  //   email: $('#email').val(),
  //   password: $('#password').val(),
  // };
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  // const form = $('#summer-form');
  // clientApi.post('/post-summer-form', null, new FormData(form));
  // clientApi.post('authorization', null, data).then((responce) => {
  //   console.log('!!!', responce);
  //   token = responce;
  // });

  fetch(
    'http://localhost:3001/authorization',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  ).then(resp => resp.json())
  .then((respData) => {
    console.log('!!!', respData);
    if ('token' in respData)
    token = respData.token;
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
    if('data1' in respData ) {
      ctx.render('index', {
        data1: respData.data1,
        data2: respData.data2,
      });
    }
  });

};

// document.querySelector('.show-button').onclick = () => {
//   clientApi.post('secret-info', null, {key: 'hi'}).then();
// };
