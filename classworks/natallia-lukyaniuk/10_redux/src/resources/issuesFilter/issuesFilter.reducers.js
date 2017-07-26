export default (state = '', action) => {
  switch (action.type) {
    case 'FIND_ISSUES':
      return action.filter;
    default:
      return state;
  }
};
