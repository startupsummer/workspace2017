import * as api from './api';


export const fetchIssues = () => dispatch =>
  api.fetchIssues()
    .then(data => dispatch({ type: 'fetchIssues', data }));

export const switchState = (item) => dispatch =>
  api.switchState(item)
    .then(data => dispatch({ type: 'switchState', data}));
