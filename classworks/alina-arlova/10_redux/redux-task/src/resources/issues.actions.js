import * as issuesApi from './issues.api.js';

export const fetchIssues = () => dispatch =>
  issuesApi.fetchIssues()
    .then(payload => dispatch({ type: 'fetchIssues', payload }));

export const changeMenuState = (menuState) => dispatch => dispatch({ type: 'changeMenuState', menuState });

export const newIssue = (lastIssueId) => dispatch =>
  issuesApi.newIssue(lastIssueId)
    .then(payload => dispatch({ type: 'newIssue', payload }));

export const closeIssue = (id) => dispatch =>
  issuesApi.closeIssue(id)
    .then(id => dispatch({ type: 'closeIssue', id }));

export const searchIssue = (text) => dispatch => dispatch({ type: 'searchIssue', text });
