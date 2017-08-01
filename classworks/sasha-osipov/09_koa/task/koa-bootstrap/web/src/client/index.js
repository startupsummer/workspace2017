import './index.scss';
import './footer.scss';
import './iLoveJs.scss';
import getYear from './getYear';
import $ from 'jquery';
import { currentPhrase } from './getWhyILove';
import { post } from '../api.client'

$('.page-footer_span').html(getYear);
$('.main__message').html(currentPhrase);

const postButton = document.querySelector('.postButton');
const lastName = document.querySelector('.lastName');
const firstName = document.querySelector('.firstName');

postButton.addEventListener('click', (event) => {
    event.preventDefault();
    post('post-form', null, {
        fn: firstName.value,
        ln: lastName.value
    }).then((data) => {
        console.dir(data);
    }).catch((err) => {
        console.dir(err);
    });
})

