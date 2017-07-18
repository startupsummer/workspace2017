import * as cardsApi from './cards.api';


export const fetchCards = () => dispatch =>
  cardsApi.fetchCards()
    .then(payload => dispatch({ type: 'fetchCards', payload }));

export const cardAdd = listId => dispatch =>
  cardsApi.cardAdd(listId)
    .then(payload => dispatch({ type: 'cardAdd', payload }));

export const cardRemove = id => dispatch =>
  cardsApi.cardRemove(id)
    .then(() => dispatch({ type: 'cardRemove', id }));
