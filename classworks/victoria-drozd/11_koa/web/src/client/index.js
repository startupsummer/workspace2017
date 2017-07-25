import styles from './index.scss';

import getYear from './getYear';
import $ from 'jquery';
import getWhyILove from './getWhyILove';
import {post as apiClientPost} from './api.client';

$('.center__text').text(getWhyILove());

$('.footer__year').text(getYear());

const sendButton = document.querySelector('.form__send');
const firstName = document.querySelector('.form__first-name').value;
const lastName = document.querySelector('.form__last-name').value;
const description = document.querySelector('.form__desc').value;
const quality = document.querySelector('.form__quality').value;

sendButton.onclick = function() {
  apiClientPost('post-form', {}, {
    firstName,
    lastName,
    description,
    quality,
  })
    .then((data) => console.dir(data))
    .catch((error) => console.dir(error));
};
