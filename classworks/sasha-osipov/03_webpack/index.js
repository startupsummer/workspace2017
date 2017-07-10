import './index.scss';
import './footer.scss';
import './iLoveJs.scss';
import getYear from './getYear';
import $ from 'jquery';
import { currentPhrase } from './getWhyILove';

$('.page-footer_span').html(getYear);
$('.main__message').html(currentPhrase);


