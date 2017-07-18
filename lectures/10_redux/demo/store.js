import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineSectionReducers from 'combine-section-reducers';

import lists from './resources/lists/lists.reducer';
import cards from './resources/cards/cards.reducer';


const reducer = combineSectionReducers({ lists, cards });

export default createStore(reducer, applyMiddleware(thunkMiddleware));
