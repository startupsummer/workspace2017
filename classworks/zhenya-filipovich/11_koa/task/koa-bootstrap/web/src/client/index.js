import year from './getYear';
import reason from './getWhyILove';
import $ from 'jquery';
import './iLoveJs.scss';   
import './footer.scss'; 
import './index.scss'; 

document.querySelector('.image').src = '/i-love-js.jpg';
$('.reason').html(reason() + ' &hearts;');
$('.year').html(year());