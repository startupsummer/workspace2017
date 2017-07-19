import { createStore, applyMiddleware, compose } from 'redux';
import combineSectionReducers from 'combine-section-reducers';
import thunkMiddleWare from 'redux-thunk';

const reducer = combineSectionReducers({});

export default createStore(
  reducer,
  compose(applyMiddleware(thunkMiddleWare)),
);
