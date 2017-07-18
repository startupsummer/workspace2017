export default (state = [], action) => {
  switch (action.type) {
    case 'fetchIssues':
    return action.payload;
    case 'issueAdd':
    return [action.payload, ...state];
    default:
    return state;
  }
};
