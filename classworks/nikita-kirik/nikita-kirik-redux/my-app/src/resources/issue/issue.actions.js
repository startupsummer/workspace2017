import * as issueApi from './issue.api';

export const fetchIssues = () => dispatch  => {
  issueApi.fetchIssues().then(payload => dispatch({ type: 'fetchIssues', payload }));
};

export const issueAdd = () => dispatch => {
  issueApi.issueAdd().then(payload => dispatch({ type: 'issueAdd', payload }));
};

export const issueToggle = (id, IssueNumb, newState) => dispatch  => {
  issueApi.issueToogle(IssueNumb, newState).then(() => dispatch({ type: 'issueToggle', id, newState }));
};
