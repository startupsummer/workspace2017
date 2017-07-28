import styles from './index.scss';
import $ from 'jquery';
import getYear from './getYear';
import getWhyILove from './getWhyILove';
import { post as apiClientPost, get as apiClientGet } from './api.client';

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
    .catch(error => console.dir(error));
};

/*const sendButton = document.querySelector('.form__send');
const firstName = document.querySelector('.form__first-name');
const lastName = document.querySelector('.form__last-name');
const description = document.querySelector('.form__desc');
const quality = document.querySelector('.form__quality');

sendButton.onclick = () => {
  apiClientPost('post-form', {}, {
    firstName: firstName.value,
    lastName: lastName.value,
    description: description.value,
    quality: quality.value,
  })
    .then(data => console.dir(data))
    .catch(error => console.dir(error));
};*/
