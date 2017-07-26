export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ISSUES':
      return action.issues;
    case 'ADD_ISSUE':
      return [...state, action.issue];
    case 'CHANGE_ISSUE':
      return state.map((item) => {
        if (item.number === action.issue.number) {
          return Object.assign(item, { state: action.issue.state });
        }
        return item;
      });
    default:
      return state;
  }
};
