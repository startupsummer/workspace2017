import * as api from './api';

export const fetchIssues = () => dispatch =>
  api.fetchIssues()
    .then(data => dispatch({ type: 'fetchIssues', data }));

export const switchState = (item) => dispatch =>
  api.switchState(item)
    .then(data => dispatch({ type: 'switchState', data}));

export const newIssue = () => dispatch =>
  api.newIssue()
    .then(data => dispatch({ type: 'newIssue', data }));

export const setSearchRequest = (event) => dispatch =>
  api.setSearchRequest(event)
    .then(data => dispatch({ type: 'setSearchRequest', data }));

export const setStateShow = (stateShow) => dispatch =>
 api.setStateShow(stateShow)
    .then(data =>  dispatch({ type: 'setStateShow', data }));
