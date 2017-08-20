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

document.querySelector('.summer-form__button').onclick = () => {
  const data = {
    firstName: $('#first-name-inp').val(),
    lastName: $('#last-name-inp').val(),
    message: $('#text-area-inp').val(),
    // rating: $('#select-inp').find(':selected').data(),    DOESNT WORK !!!
    rating: Number(document.getElementById("select-inp").value),
  };
  // const form = $('#summer-form');
  // clientApi.post('/post-summer-form', null, new FormData(form));
  clientApi.post('post-summer-form', null, data);
};
