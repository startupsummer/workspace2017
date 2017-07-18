export function getCardsByListId(state, listId) {
  return state.filter(card => card.listId === listId);
}
