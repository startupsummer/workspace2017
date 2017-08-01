import * as listsApi from './issues.api';

export const fetchIssues = () => dispatch =>
  listsApi.fetchIssues()
    .then(payload => dispatch({type: 'fetchIssues', payload }));

export const closeIssue = id => dispatch =>
  listsApi.closeIssue(id)
    .then(() => dispatch({ type: 'closeIssue', id }));

export const addNewIssue = data => dispatch =>
  listsApi.addNewIssue(data)
    .then(payload => dispatch({type: 'addNewIssue', payload }));

export const searchText = text => dispatch =>
  listsApi.searchText(text)
    .then(() => dispatch({type: 'searchText', text }));

export const setCurrentTab = () => dispatch =>
  listsApi.setCurrentTab()
    .then(payload => dispatch({type: 'setCurrentTab', payload }));

export const showOpenTab = () => dispatch =>
  listsApi.showOpenTab()
    .then(payload => dispatch({type: 'showOpenTab', payload }));

export const showClosedTab = () => dispatch =>
  listsApi.showClosedTab()
    .then(payload => dispatch({type: 'showClosedTab', payload }));