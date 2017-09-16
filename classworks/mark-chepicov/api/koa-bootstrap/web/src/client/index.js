require('./index.scss');
require('./view.js');
const $ = require('jquery');
const getYear = require('./getYear.js');

if (!localStorage.token) {
  document.querySelector('#login').style.display = 'none';
  document.querySelector('#logout').style.display = 'none';
  $('.main__text').html('Log in');
} else {
    document.querySelector('#forma').style.display = 'none';
    document.querySelector('#login').style.background = 'green';
    $('.main__text').html('SECRET INFORMATION!!!!!!!!');
    document.querySelector('#logout').style.display = 'block';
}

$('.footer__year').append(getYear());

