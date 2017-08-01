const $ = require('jquery');
const moment = require('moment');

const phrases = ['Greate', 'Awesome', 'Wonderful', 'Beautiful'];

const getPhrase = (() => $('.main__text').html(phrases[moment().format('ss') % 4]))();
