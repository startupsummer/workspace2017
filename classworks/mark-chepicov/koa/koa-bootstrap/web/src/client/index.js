require('./index.scss');
require('./view.js');
const $ = require('jquery');
const getYear = require('./getYear.js');

$('.footer__year').append(getYear());
const getWhyILove = require('./getWhyILove.js');

$('.main__text').append(getWhyILove());
