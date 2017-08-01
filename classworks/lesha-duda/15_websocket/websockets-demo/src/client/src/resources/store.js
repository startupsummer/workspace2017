import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineSectionReducers from 'combine-section-reducers';

import user from './user/user.reducer';
import messages from './message/message.reducer';
import room from './room/room.reducer';

const reducer = combineSectionReducers({ user, messages, room });

export default createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() :
      noop => noop,
  ),
);
