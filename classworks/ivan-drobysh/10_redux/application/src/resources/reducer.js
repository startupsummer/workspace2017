export default (state = {issues: []}, action) => {
  switch (action.type) {
    case 'fetchIssues':
      return {
        ...state,
        issues: action.data
      }
    default:
      return state;
  }
};
