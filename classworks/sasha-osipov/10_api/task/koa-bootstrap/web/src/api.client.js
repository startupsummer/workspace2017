import fetch from 'isomorphic-fetch';
import qs from 'querystring';

const baseApiUrl = 'http://localhost:3001';

const getQueryString = (queryStringObject = {}) => {
  return `${qs.stringify(queryStringObject)}`;
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
        .then(obj => { throw new Error(JSON.stringify(obj)); });
    }

    return response.text()
      .then(text => { throw new Error(text); });
  }

  const isJSON = response.headers.get('Content-Type').includes('application/json');
  return isJSON ? response.json() : response;
};

const postJsonHeaders = {
  'Content-Type': 'application/json',
};

export const get = (path, queryStringObject, headers) =>
  fetch(buildUrl(path, queryStringObject), {
    method: 'GET',
    headers,
  })
    .then(responseHandler);

export const post = (path, queryStringObject, body) =>
  fetch(buildUrl(path, queryStringObject), {
    method: 'POST',
    headers: postJsonHeaders,
    body: JSON.stringify(body),
  })
    .then(responseHandler);