import './index.scss';
import phrase from './getWhyILove';
import { cur_date } from './getYear';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';
import qs from 'querystring';

import { get, post } from './api.client';

$('#aboutJS').html(`${phrase}`);
$('.my_name p').html(`Oliferchik Sergey, ${cur_date} © All rights reserved`);

const send = document.querySelector('.send');
const firsName = document.querySelector('.firsName');
const lastName = document.querySelector('.lastName');
const aboutSummer =  document.querySelector('.aboutSummer');
const request = () => post('hello', null, {
  firsName: firsName.value,
  lastName: lastName.value,
  aboutSummer: aboutSummer.value,
});

send.addEventListener("click", request);
