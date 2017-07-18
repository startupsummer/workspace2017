import * as api from './api';


export const fetchIssues = () => dispatch =>
  api.fetchIssues()
    .then(data => dispatch({ type: 'fetchIssues', data }));
