import fetch from 'isomorphic-fetch';
import qs from 'querystring';

const baseApiUrl = 'http://localhost:3001';

const getQueryString = (queryStringObject = {}) => {
  return `${qs.stringify({ queryStringObject })}`;
};

const buildUrl = (path, queryStringObject = {}) =>
  `${baseApiUrl}/${path}?${getQueryString(queryStringObject)}`;

const responseHandler = response => {
  if (response.status >= 500) {
    return response.text()
      .then(text => { throw new Error(text); });
  }

  if (response.status >= 400) {
    const isJSON = response.headers.get('Content-Type').includes('application/json');

    if (isJSON) {
      return response.json()
        .then(obj => {
          const iLoveJS = document.querySelector('.iLoveJs');
          const error = document.createElement('h2');
          error.style.color = 'red';
          console.log(typeof JSON.stringify(obj))
          error.innerHTML = JSON.stringify(obj);
          iLoveJS.appendChild(error);
          localStorage.getItem('token')
        });
    }
    return response.text()
      .then(text => { throw new Error(text); });
  }

  localStorage.setItem('token', response.headers.get('X-ACCESS-TOKEN'));

  return response.json()
    .then(obj => console.log(obj));
};

const postJsonHeaders = {
  'Content-Type': 'application/json',
  'X-ACCESS-TOKEN': localStorage.getItem('token'),
};

export const get = (path, queryStringObject) =>
  fetch(buildUrl(path, queryStringObject))
    .then(responseHandler);

export const post = (path, queryStringObject, body) =>
  fetch(buildUrl(path, queryStringObject), {
    method: 'POST',
    headers: postJsonHeaders,
    body: JSON.stringify(body),
  })
    .then(responseHandler);
