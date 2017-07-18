import * as listsApi from './lists.api';


export const fetchLists = () => dispatch =>
  listsApi.fetchLists()
    .then(payload => dispatch({ type: 'fetchLists', payload }));

export const listAdd = () => dispatch =>
  listsApi.listAdd()
    .then(payload => dispatch({ type: 'listAdd', payload }));

export const listRemove = id => dispatch =>
  listsApi.listRemove(id)
    .then(() => dispatch({ type: 'listRemove', id }));
