const $ = require('jquery');
const moment = require('moment');

const getYear = (() => $('.main__footer--year').html(moment().format('YYYY')))();
