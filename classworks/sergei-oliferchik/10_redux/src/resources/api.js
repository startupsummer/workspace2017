const ACCESS_TOKEN = 'access_token=15565f636cf3a818858158b85e87d9d1cbb5a639';
const url = `https://api.github.com/repos/Oliferchik/delrep/issues`;
const urlPost = `${url}?${ACCESS_TOKEN}`;
const urlGet = `${url}?state=all&${ACCESS_TOKEN}`;


export const chengeIssuesStatus = (number, status) => (
  fetch(`${url}/${number}?${ACCESS_TOKEN}`, {
    method: 'PATCH',
    body: JSON.stringify({
      state: status,
    }),
  }).then(response => response.json())
)

export const addIssues = (body) => (
  fetch(urlPost, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then(response => response.json())
)

export const initialState = () => fetch(urlGet)
