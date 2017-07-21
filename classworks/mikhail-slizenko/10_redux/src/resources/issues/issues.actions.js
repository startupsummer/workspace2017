import * as issuesListApi from './issues.api';

export const fetchIssuesList = () => dispatch => {
  issuesListApi.fetchIssuesList()
    .then(data => data.map(item => ({
        id: item.id,
        description: item.body,
        title: item.title,
        state: item.state,
        number: item.number
      })))
    .then(payload => dispatch({type: 'fetchIssuesList', payload}));
}

export const openNewIssue = () => dispatch => {
  issuesListApi.openNewIssue()
    .then(item => ({
      id: item.id,
      description: item.body,
      title: item.title,
      state: item.state,
      number: item.number
    }))
    .then(payload => dispatch({type: 'openNewIssue', payload}));
}

export const changeIssue = issue => dispatch => {
  const newIssueState = issue.state === 'open'
    ? 'closed'
    : 'open';
  const number = issue.number;

  issuesListApi.changeIssue(newIssueState, number)
    .then(item => ({
      id: item.id,
      description: item.body,
      title: item.title,
      state: item.state,
      number: item.number
    }))
    .then(payload => dispatch({type: 'changeIssue', payload}));
}

export const setSearchQuery = searchQuery =>
  ({type: 'searchQuery', searchQuery});
