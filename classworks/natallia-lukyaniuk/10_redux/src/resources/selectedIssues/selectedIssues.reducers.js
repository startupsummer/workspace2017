
export default (state = 'open', action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_ISSUES':
      return action.state;
    default:
      return state;
  }
};
