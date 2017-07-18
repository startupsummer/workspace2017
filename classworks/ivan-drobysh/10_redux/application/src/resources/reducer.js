
export default (state = {issues: []}, action) => {
  switch (action.type) {
    case 'fetchIssues':
      return {
        ...state,
        issues: action.data
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
    default:
      return state;
  }
};
