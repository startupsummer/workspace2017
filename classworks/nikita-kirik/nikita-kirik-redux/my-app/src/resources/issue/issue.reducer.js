export default (state = [], action) => {
  switch (action.type) {
    case 'fetchIssues':
      return action.payload;
    case 'issueAdd':
      return [action.payload, ...state];
    case 'issueToggle':
      return state.map(it => it.id === action.id ? {...it, state: action.newState} : it);
    default:
      return state;
  }
};
