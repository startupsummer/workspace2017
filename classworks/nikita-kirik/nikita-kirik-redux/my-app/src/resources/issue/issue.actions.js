import * as issueApi from './issue.api';

export const issueAdd = () => dispatch => {
  issueApi.issueAdd().then(payload => dispatch({ type: 'issueAdd', payload }));
}

export const fetchIssues = () => dispatch  => {
  issueApi.fetchIssues().then(payload => dispatch({ type: 'fetchIssues', payload }));
}
