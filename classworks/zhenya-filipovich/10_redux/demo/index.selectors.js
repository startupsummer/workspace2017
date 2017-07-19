import * as fromLists from './resources/lists/lists.selectors';
import * as fromCards from './resources/cards/cards.selectors';


export default {
  getCardsByListId: (state, listId) =>
    fromCards.getCardsByListId(state.cards, listId),

  getLists: state => fromLists.getLists(state.lists),
};
