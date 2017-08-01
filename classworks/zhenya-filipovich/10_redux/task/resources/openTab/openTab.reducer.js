export default (state = 'open', action) => {
  switch (action.type) {
    case 'OPEN_TAB':
      return 'open';
    case 'CLOSE_TAB':
      return 'closed';
    default:
      return state;
  }
};
