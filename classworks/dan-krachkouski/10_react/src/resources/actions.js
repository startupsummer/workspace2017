import * as api from './api';


export const fetchIssues = () =>
  dispatch =>
  api.fetchIssues()
  .then(data => dispatch({
    type: 'FETCH_ISSUES',
    payload: data,
  }));


export const setIssueState = (issueNumber, nextState) =>
  dispatch =>
  api.setIssueState(issueNumber, nextState)
  .then(data => dispatch({
    type: 'SET_ISSUE_STATE',
    payload: data,
  }));


export const openIssue = (newIssue) =>
  dispatch =>
  api.openIssue(newIssue)
  .then(data => dispatch({
    type: 'OPEN_ISSUE',
    payload: data,
  }));
