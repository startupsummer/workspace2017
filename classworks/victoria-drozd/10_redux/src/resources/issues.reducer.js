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

    default:
      return state;
  }
};