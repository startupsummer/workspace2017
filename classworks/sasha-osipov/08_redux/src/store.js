import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './Resources/issues.reducer';

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => console.log('subscribe', store.getState()))

export default store;
