import queryString from 'query-string';

const rootUrl = process.config.rootUrl;
const apiUrl = `${rootUrl}/api`;

const apiClient = {};

['get', 'post', 'put', 'delete'].forEach((method) => {
  apiClient[method] = async (url, data = null) => {
    const params = (method === 'get' && data) ? `?${queryString.stringify(data)}` : '';

    const requestUrl = `${apiUrl}/${url}${params}`;
    const requestBody = (method !== 'get' && data) ? JSON.stringify(data) : undefined;

    const response = await fetch(requestUrl, {
      method: method.toUpperCase(),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    return response.json();
  };
});

export default apiClient;
