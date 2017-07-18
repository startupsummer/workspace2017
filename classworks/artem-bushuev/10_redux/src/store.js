import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import combineSectionReducers from 'combine-section-reducers';


//import lists from './resources/lists/lists.reducer';
//import cards from './resources/cards/cards.reducer';

import reducer from './reduce/data.reducer'

/*
const reducer = () => {
  return {
    data,
    state: 'open',
  }
}
*/

export default createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop,
  ),
);
