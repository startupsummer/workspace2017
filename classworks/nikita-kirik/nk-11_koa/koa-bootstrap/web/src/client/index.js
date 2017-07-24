import './index.scss';
import './iLoveJs.scss';
import './footer.scss';
import './summer-form.scss';
import $ from 'jquery';

import { getYear } from './getYear.js';
import { getWhyILove } from './getWhyILove.js';

$('#main-footer__year').append(getYear());
$('.main-block__message').append(`...because ${getWhyILove()}`);
