import styles from './index.scss';
import $ from 'jquery';
import getYear from './getYear';
import getWhyILove from './getWhyILove';
import { post as apiClientPost } from './api.client';

$('.center__text').text(getWhyILove());

$('.footer__year').text(getYear());

const signButton = document.querySelector('.form__sign');
const email = document.querySelector('.form__email');
const password = document.querySelector('.form__password');

signButton.onclick = () => {
  apiClientPost('auth', {}, {
    email: email.value,
    password: password.value,
  })
    .then(data => console.dir(data))
    .then(() => window.location.href = '/protected')
    .catch(error => {
      $('.errors').text(error);
      console.dir(error)
    });
};
