
let issues;
export default (state = {issues: [], searchRequest: ''}, action) => {
  switch (action.type) {
    case 'fetchIssues':
       issues = action.data;
      return {
        ...state,
        issues
      }
    case 'switchState':

      return {
        issues: state.issues.map((item) => {
          if(item.id === action.data.id) {
            return action.data;
          }
          return item;
        })
      }
    case 'newIssue':
     issues = [...state.issues, action.data];
      return {
        issues
      }
    case 'setSearchRequest':
      return {
        ...state,
        searchRequest: action.data,
      }
    default:
      return state;
  }
};
