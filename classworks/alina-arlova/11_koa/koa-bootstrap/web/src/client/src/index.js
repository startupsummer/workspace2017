import $ from 'jquery';
import './index.scss';
import getYear from './getYear';
import phrase from './getWhyILove';
import './formProcessing.js';

$('.footer__year').html(getYear);
$('.main-part__text').html(phrase);
