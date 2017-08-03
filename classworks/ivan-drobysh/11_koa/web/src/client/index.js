import { getYear } from './getYear';

require('./styles/index.scss');
require('./styles/iLoveJs.scss');
require('./styles/footer.scss');
require('./styles/form.scss');


const $ = require('jquery');

$('.footer__text').text(`Ivan Drobysh, ${getYear()} © All rights reserved`);
