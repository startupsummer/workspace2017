export default (state = [], action) => {
  switch (action.type) {
    case 'fetchCards':
      return action.payload;
    case 'cardAdd':
      return [...state, action.payload];
    case 'cardRemove':
      return state.filter(card => card.id !== action.id);
    default:
      return state;
  }
};
