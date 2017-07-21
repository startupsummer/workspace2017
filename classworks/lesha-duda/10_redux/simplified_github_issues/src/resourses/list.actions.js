import * as listApi from "./list.api";

export const fetchList = () => dispatch => 
  listApi.fetchList()
  .then(payload => dispatch({type: 'fetchList', payload}));

export const addListItem = () => dispatch => {
  listApi.addListItem()
  .then(payload => dispatch({type: 'addListItem', payload}));
}

export const closeListItem = (number) => dispatch => 
  listApi.closeListItem(number)
  .then(item => ({
    state: item.state,
    id: item.id,
  }))
  .then(payload => dispatch({type: 'closeListItem', payload}));
  