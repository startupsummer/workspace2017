import $ from 'jquery';
import year from './getYear';
import reason from './getWhyILove';
import './../styles/iLoveJs.scss';
import './../styles/footer.scss';

document.querySelector('.image').src = '../images/i-love-js.jpg';
$('.reason').html(`${reason()}&hearts;`);
$('.year').html(year());
