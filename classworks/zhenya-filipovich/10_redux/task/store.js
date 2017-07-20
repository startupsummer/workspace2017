import { createStore, applyMiddleware, compose } from 'redux';
import combineSectionReducers from 'combine-section-reducers';
import thunkMiddleWare from 'redux-thunk';
import issues from 'resources/issues/issues.reducer';
import openTab from 'resources/openTab/openTab.reducer';
import inputValue from 'resources/inputValue/inputValue.reducer';

const reducer = combineSectionReducers({
  issues,
  openTab,
  inputValue,
});

export default createStore(
  reducer,
  compose(applyMiddleware(thunkMiddleWare)),
);
