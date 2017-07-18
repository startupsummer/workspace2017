import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineSectionReducers from 'combine-section-reducers';

import issueReducer from './resources/issue/issue.reducer';
// import cards from './resources/cards/cards.reducer';
//
//
// const reducer = combineSectionReducers({ lists, cards });

// const reducer = ;
const store = createStore(
  issueReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop,
  ),
);
// store.dispatch();
export default store;
