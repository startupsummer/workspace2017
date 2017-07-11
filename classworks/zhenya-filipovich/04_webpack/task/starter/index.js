import year from './getYear';
import reason from './getWhyILove';
import img from './i-love-js.jpg'; 
import $ from 'jquery';
import './iLoveJs.scss';   
import './footer.scss'; 
import './index.scss'; 

document.querySelector('.image').src = img;
$('.reason').html(reason() + ' &hearts;');
$('.year').html(year());


