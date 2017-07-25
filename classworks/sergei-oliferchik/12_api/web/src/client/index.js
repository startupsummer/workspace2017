import './index.scss';
import phrase from './getWhyILove';
import { cur_date } from './getYear';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';
import qs from 'querystring';

import { get, post } from './api.client';

$('#aboutJS').html(`${phrase}`);
$('.my_name p').html(`Oliferchik Sergey, ${cur_date} © All rights reserved`);

const registration = document.querySelector('.registration');
const authorization =  document.querySelector('.authorization');
const loginAuthorization = document.querySelector('.loginAuthorization');
const passwordAuthorization = document.querySelector('.passwordAuthorization');
const loginRegistration = document.querySelector('.loginRegistration');
const passwordRegistration = document.querySelector('.passwordRegistration');

const requestRegistration = () => post('hello', null, {
  loginRegistration: loginRegistration.value,
  passwordRegistration: passwordRegistration.value,
});

const requestAuthorization = () => post('hello', null, {
  loginAuthorization: loginAuthorization.value,
  passwordAuthorization: passwordAuthorization.value,
});

registration.addEventListener("click", requestRegistration);
authorization.addEventListener("click", requestAuthorization);
