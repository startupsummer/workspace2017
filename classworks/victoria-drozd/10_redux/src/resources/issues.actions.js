import * as listsApi from './issues.api';

export const fetchIssues = () => dispatch =>
  listsApi.fetchIssues()
    .then(payload => dispatch({type: 'fetchIssues', payload }));

export const closeIssue = id => dispatch =>
  listsApi.closeIssue(id)
    .then(() => dispatch({ type: 'closeIssue', id }));