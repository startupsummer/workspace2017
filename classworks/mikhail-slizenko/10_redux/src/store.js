import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from 'resources/issues/issues.reducers';

export default createStore(reducers, applyMiddleware(thunkMiddleware));
