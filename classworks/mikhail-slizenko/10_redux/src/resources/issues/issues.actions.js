import * as issuesListApi from './issues.api';

export const fetchIssuesList = () => dispatch => {
  issuesListApi.fetchIssuesList()
    .then(data => data.map(i => ({
        id: i.id,
        description: i.body,
        title: i.title,
        state: i.state,
        number: i.number
      })))
    .then(payload => dispatch({ type: 'fetchIssuesList', payload }));
}

export const openNewIssue = () => dispatch => {
  issuesListApi.openNewIssue()
    .then(i => ({
      id: i.id,
      description: i.body,
      title: i.title,
      state: i.state,
      number: i.number
    }))
    .then(payload => dispatch({ type: 'openNewIssue', payload }));
}

export const changeIssue = issue => dispatch => {
  const newIssueState = issue.state === 'open'
    ? 'closed'
    : 'open';
  const number = issue.number;

  issuesListApi.changeIssue(newIssueState, number)
    .then(i => ({
      id: i.id,
      description: i.body,
      title: i.title,
      state: i.state,
      number: i.number
    }))
    .then(payload => dispatch({ type: 'changeIssue', payload }));
}

export const changeIssuesState = issuesState =>
  ({ type: 'issuesState', issuesState });

export const setSearchQuery = searchQuery =>
  ({ type: 'searchQuery', searchQuery });
