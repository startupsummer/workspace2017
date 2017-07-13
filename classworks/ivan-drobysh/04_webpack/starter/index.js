require('./styles/index.scss');
require('./styles/iLoveJs.scss');
require('./styles/footer.scss');
import { getYear } from './getYear.js';
import { getWhyILove } from './getWhyILove.js';
var $ = require('jquery');
$('.footer__text').text('Ivan Drobysh, ' + getYear() + ' © All rights reserved');
$('.image-cont__text').text('cause, ' + getWhyILove());
