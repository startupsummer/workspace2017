import fetch from 'isomorphic-fetch';
import qs from 'querystring';

const baseApiUrl = 'http://localhost:3002';

const getQueryString = (queryStringObject = {}) => {
  // return `${qs.stringify({ ...queryStringObject })}`;
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

    // return response.text()
    // .then(text => { throw new Error(text); });
  }

  return response.json()
  .then(obj => obj.results || obj);
};

const postJsonHeaders = {
  'Content-Type': 'application/json',
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
// .then(responseHandler);
