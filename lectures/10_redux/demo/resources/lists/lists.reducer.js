export default (state = [], action) => {
  switch (action.type) {
    case 'fetchLists':
      return action.payload;
    case 'listAdd':
      return [...state, action.payload];
    case 'listRemove':
      return state.filter(list => list.id !== action.id);
    default:
      return state;
  }
};
