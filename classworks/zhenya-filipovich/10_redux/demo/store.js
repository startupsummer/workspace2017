import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineSectionReducers from 'combine-section-reducers';

import lists from './resources/lists/lists.reducer';
import cards from './resources/cards/cards.reducer';


const reducer = combineSectionReducers({ lists, cards });

export default createStore(
  reducer,  
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop,
  ),
);
