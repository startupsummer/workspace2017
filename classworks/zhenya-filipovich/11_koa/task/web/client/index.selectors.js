import * as issuesAPI from './resources/issues/issues.api';
import * as actionIssueCreators from './resources/issues/issues.actions';
import changeInputAction from './resources/inputValue/inputValue.actions';
import * as openTabCreators from './resources/openTab/openTab.actions';

export const getDataFromServer = () => (dispatch) => {
  issuesAPI.getDataFromServer()
    .then(payload => dispatch(actionIssueCreators.fetchIssues(payload)));
};

export const changeInput = e => (dispatch) => {
  dispatch(changeInputAction(e.target.value));
};

export const addIssue = () => (dispatch) => {
  issuesAPI.addIssues()
    .then(payload => dispatch(actionIssueCreators
      .addIssue(payload)));
};

export const changeIssueState = item => (dispatch) => {
  issuesAPI.changeIssueState(item)
    .then(payload => dispatch(actionIssueCreators
      .changeIssueState(payload)));
};

export const enableOpenTab = () => (dispatch) => {
  dispatch(openTabCreators.openTab());
};

export const enableCloseTab = () => (dispatch) => {
  dispatch(openTabCreators.closedTab());
};
