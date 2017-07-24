require('./index.scss');
require('./iLoveJs.scss');
require('./footer.scss');

const moment = require('moment');

import { getYearNow } from './getYear';
import { getWhyLove } from './getWhyILove';
import $ from 'jquery';

const currentTimeStamp = getYearNow();
const phrase = getWhyLove(currentTimeStamp);

const date = new Date(currentTimeStamp);
const year = date.getFullYear();

$('.year').text(year);
$('.text--love').text(phrase);
