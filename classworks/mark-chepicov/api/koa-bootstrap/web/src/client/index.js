require('./index.scss');
require('./view.js');
const $ = require('jquery');
const getYear = require('./getYear.js');
document.querySelector('#login').style.display = 'none';
document.querySelector('#logout').style.display = 'none';

$('.footer__year').append(getYear());

$('.main__text').html('Log in');
