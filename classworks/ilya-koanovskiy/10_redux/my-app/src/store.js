import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './Resources/issues/issues.reducer';

export default createStore(reducer, applyMiddleware(thunkMiddleware));
