export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ISSUES':
      return action.payload;
    case 'CHANGE_ISSUE_STATE':
      return state.map(item => (
        (item.id === action.payload.id) ? action.payload : item
      ));
    case 'ADD_ISSUE':
      return [...state, action.payload];
    default:
      return state;
  }
};
