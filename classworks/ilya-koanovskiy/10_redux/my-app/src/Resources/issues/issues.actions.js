import * as issuesApi from './issues.api';

export const fetchIssues = () => 
  dispatch =>
  issuesApi.fetchIssues()
  .then(data => dispatch({
    type : "FETCH_ISSUES", 
    payload : data
  }));

export const addIssue = () => 
  dispatch =>
  issuesApi.addIssue()
  .then(data => dispatch({
    type : "ADD_ISSUE", 
    payload : data
  }));

export const changeIssue = (num) => 
 dispatch => 
  issuesApi.changeIssue(num)
  .then(data => dispatch({
    type : "CHANGE_ISSUE", payload : data, number : num 
  }));


export const changeActiveButton = (activeButton) => dispatch =>{
  return dispatch({type:"CHANGE_ACTIVE_BUTTON", payload: activeButton});
}

export const changeInput = (value) => dispatch =>{
  return dispatch({type:"CHANGE_INPUT", payload: value});
}
