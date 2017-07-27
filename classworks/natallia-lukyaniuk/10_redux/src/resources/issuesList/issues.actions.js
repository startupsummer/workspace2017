import * as issuesApi from './issues.api';


export const fetchIssues = () => dispatch =>
  issuesApi.fetchIssues()
    .then((issues) => {
      dispatch({ type: 'FETCH_ISSUES', issues });
    });

export const addIssue = newIssue => dispatch =>
  issuesApi.addIssue(newIssue)
    .then((issue) => {
      dispatch({ type: 'ADD_ISSUE', issue });
    });

export const changeIssue = (number, newIssue) => dispatch =>
  issuesApi.changeIssue(number, newIssue)
    .then((issue) => {
      dispatch({ type: 'CHANGE_ISSUE', issue });
    });
