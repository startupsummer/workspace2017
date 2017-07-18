import * as issuesApi from './issues.api';

export const fetchIssues = () => dispatch =>
  issuesApi.fetchIssues()
  .then(data => data.map(item => ({
    id: item.id,
    description: item.body,
    title: item.title,
    state: item.state,
    number: item.number,
  })))
  .then(payload => dispatch({ type: 'fetchIssues', payload }));

export const addIssue = () => dispatch =>
  issuesApi.addIssue()
  .then(item => ({
    id: item.id,
    description: item.body,
    title: item.title,
    state: item.state,
    number: item.number,
  }))
  .then(payload => dispatch({ type: 'addIssue', payload }))

export const changeIssue = (number, state) => dispatch => {
  issuesApi.changeIssue(number, state)
  .then(item => ({
    id: item.id,
    description: item.body,
    title: item.title,
    state,
    number,
  }))
  .then(payload => dispatch({ type: 'changeIssue', payload }))
}

export const changeIssuesState = state => ({ type: 'IssuesState', state })

export const searchIssues = value => ({ type: 'searchIssues', value }) 

