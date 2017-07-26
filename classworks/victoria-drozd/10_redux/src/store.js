import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import issuesReducer from './resources/issues.reducer';

export default createStore(issuesReducer, applyMiddleware(thunkMiddleware));


