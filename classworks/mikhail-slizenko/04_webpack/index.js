import './index.scss';

import $ from 'jquery';

import getYear from './getYear'
import { getReason, getMin } from './getWhyILove'


$('.js-get-year').text(getYear());

$('.js-get-reason').text(getReason(getMin()));
