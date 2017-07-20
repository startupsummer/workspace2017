import * as itemsApi from './items-api.js';


export const fetchItems = () => dispatch =>
  itemsApi.fetchItems()
    .then(payload => dispatch({ type: 'fetchItems', payload }));

export const itemAdd = () => dispatch =>
  itemsApi.itemAdd()
    .then(payload => dispatch({ type: 'itemAdd', payload }));

export const itemClose = (id, number) => dispatch =>
  itemsApi.itemClose(id, number)
    .then(() => dispatch({ type: 'itemClose', id }));

export const itemOpen = (id, number) => dispatch =>
  itemsApi.itemOpen(id, number)
    .then(() => dispatch({ type: 'itemOpen', id }));
