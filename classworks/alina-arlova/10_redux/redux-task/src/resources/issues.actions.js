import * as issuesApi from './issues.api.js';

export const fetchIssues = () => dispatch =>
  issuesApi.fetchIssues()
    .then(payload => dispatch({ type: 'fetchIssues', payload }));
