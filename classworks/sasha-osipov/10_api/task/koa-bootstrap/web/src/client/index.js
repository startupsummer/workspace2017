import './index.scss';
import './footer.scss';
import './iLoveJs.scss';
import getYear from './getYear';
import $ from 'jquery';
import { post, get } from '../api.client'

$('.page-footer_span').html(getYear);

const postButton = document.querySelector('.main__input--button');
const secretButton = document.querySelector('.main__input--secret');
const mail = document.querySelector('.main__input--mail');
const pass = document.querySelector('.main__input--pass');
const info = document.querySelector('.main__message');
let token;

postButton.addEventListener('click', (event) => {
    let newItem = {
        mail: mail.value,
        pass: pass.value,
    }
    console.log(JSON.stringify(newItem))

    event.preventDefault();
    fetch('/hello', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(newItem),
    })
    .then(resolve => resolve.json())
    .then(data => {
        token = data.token
        localStorage.setItem('token', token)
        console.dir(data)
    })

})

secretButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/vapeshop', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            token: localStorage.getItem('token'),
        },
    })
    .then(resolve => {
        if(resolve.status === 200) {
            return resolve.json()
        } else {
            localStorage.clear()
            return resolve.json()
        }
    })
    .then(data => {
        info.textContent = data.res
        console.dir(data)
    })
})




