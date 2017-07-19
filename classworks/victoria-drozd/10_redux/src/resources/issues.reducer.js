import {displayAll} from './utils';

export default (state = [], action) => {
  switch (action.type) {
    case 'fetchIssues':
      return action.payload;
    case 'closeIssue':

      return state.map(issue => {
        if (issue.id !== action.id) {
          return issue;
        }

        return {...issue, state: 'closed'};
      });

    case 'addNewIssue':
      return displayAll(state.concat(action.payload));
    case 'searchText':

      return state.map(issue => ({
        ...issue,
        display: Boolean(~issue.title.toLowerCase().indexOf(action.text.toLowerCase()))
      }));

    default:
      return state;
  }
};