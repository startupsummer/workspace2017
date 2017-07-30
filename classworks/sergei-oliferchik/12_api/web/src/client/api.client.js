import fetch from 'isomorphic-fetch';
import qs from 'querystring';

const baseApiUrl = 'http://localhost:3001';

const buildUrl = (path) => `${baseApiUrl}/${path}`;

const responseHandler = response => {

  const isJSON = response.headers.get('Content-Type').includes('application/json');

  if (response.status >= 500) {
    return response.text()
      .then(text => { throw new Error(text); });
  }

  if (response.status >= 400) {

    if (isJSON) {

      return response.json()
        .then(obj => {
          const iLoveJS = document.querySelector('.iLoveJs');

          const error = document.createElement('h2');
          error.style.color = 'red';
          error.innerHTML = JSON.stringify(obj);

          iLoveJS.appendChild(error);
        })
        .catch(err => console.log(err));
    }
    return response.text()
      .then(text => { throw new Error(text); });
  }
};

const postJsonHeaders = () => ({ 'Content-Type': 'application/json' })


export const get = (path) =>
  fetch(buildUrl(path))
    .then(responseHandler)

export const post = (path, body) =>
  fetch(buildUrl(path), {
    method: 'POST',
    headers: postJsonHeaders(),
    body: JSON.stringify(body),
  })
    .then(responseHandler)
