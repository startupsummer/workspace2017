
let issues;
export default (state = {
  issues: [],
  searchRequest: '',
  stateShow: 'all'
}, action) => {
  switch (action.type) {
    case 'fetchIssues':
       issues = action.data;
      return {
        ...state,
        issues
      }
    case 'switchState':

      return {
        ...state,
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
        ...state,
        issues
      }
    case 'setSearchRequest':
      return {
        ...state,
        searchRequest: action.data,
      }
    default:
      return state;
    case 'setStateShow':
     return {
       ...state,
       stateShow: action.data,
     }
  }
};
