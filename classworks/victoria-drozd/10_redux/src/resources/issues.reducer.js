import {displayAll} from '../utils';

export default (state = {issues: [], currentTab: ''}, action) => {
  let newIssues;

  switch (action.type) {
    case 'fetchIssues':
      return {...state, issues: action.payload};
    case 'closeIssue':

      newIssues = state.issues.map(issue => {
        if (issue.id !== action.id) {
          return issue;
        }

        return {...issue, state: 'closed'};
      });
      return {...state, issues: newIssues};

    case 'addNewIssue':
      newIssues = displayAll(state.issues.concat(action.payload));
      return {currentTab: 'open', issues: newIssues};
    case 'searchText':

      newIssues = state.issues.map(issue => ({
        ...issue,
        display: issue.title.toLowerCase().includes(action.text.toLowerCase())
      }));

      return {...state, issues: newIssues};

    case 'setCurrentTab':
    case 'showOpenTab':
    case 'showClosedTab':
      return {...state, currentTab: action.payload};
    default:
      return state;
  }
};