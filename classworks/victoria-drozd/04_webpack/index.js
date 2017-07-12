import styles from './index.scss';

import getYear from './getYear';
import $ from 'jquery';
import getWhyILove from './getWhyILove';

$('.center__text').text(getWhyILove());

$('.footer__year').text(getYear());
