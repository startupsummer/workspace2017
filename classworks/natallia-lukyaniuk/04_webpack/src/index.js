import $ from 'jquery';

import './styles/index.scss';
import currentYear from './getYear';
import getWhyLove from './getWhyILove';
import getPhrase from './getPhrase';
import './assets/img/i-love-js.jpg';

$('#footer__currentYear').append(currentYear());
$('.header__text')[0].append(getPhrase(getWhyLove()));

