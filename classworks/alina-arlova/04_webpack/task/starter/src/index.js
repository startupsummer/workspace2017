import './index.scss';
import $ from "jquery";
import { getYear } from './getYear';
import phrase from './getWhyILove';

$('.footer__year').html(getYear);
$('.main-part__text').html(phrase);
