import './index.scss';
import phrase from './getWhyILove';
import { cur_date } from './getYear';
import $ from 'jquery';

// setTimeout((date, phrase) => {
//   $('#aboutJS').html(`${phrase}`);
//   $('.my_name p').html(`Oliferchik Sergey, ${cur_date} © All rights reserved`);
// }, 1000, cur_date, phrase)

$('#aboutJS').html(`${phrase}`);
$('.my_name p').html(`Oliferchik Sergey, ${cur_date} © All rights reserved`);
