import $ from 'jquery';

import getYear from './getYear';
import { getReason, getMin } from './getWhyILove';

import './index.scss';


$('.js-get-year').text(getYear());

$('.js-get-reason').text(getReason(getMin()));

const submitBtn = document.querySelector('.js-submit');
const form = document.querySelector('.js-form');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const body = {
    firstName: form.firstname.value,
    lastName: form.lastname.value
  }

  fetch('/post-form', {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
});
