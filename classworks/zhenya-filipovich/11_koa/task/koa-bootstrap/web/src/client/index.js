import year from './getYear';
import reason from './getWhyILove';
import { post } from '../api.client';
import $ from 'jquery';
import './iLoveJs.scss';
import './footer.scss';
import './index.scss';

document.querySelector('.image').src = '/i-love-js.jpg';
$('.reason').html(reason() + ' &hearts;');
$('.year').html(year());

const firstName = document.querySelector('.form__email');
const lastName = document.querySelector('.form__password');
const formSubmit = document.querySelector('.form__submit');


formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  post('post-form', null, {
    fn: firstName.value,
    ln: lastName.value,
  }).then((data) => {
    console.dir(data);
  }).catch((err) => {
    console.dir(err);
  });
});
