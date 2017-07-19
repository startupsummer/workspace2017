import * as fromIssue from './resources/selectors';


export default {
  getIssuesShowNow: (state) =>
    fromIssue.getIssuesShowNow(state),

  getIssues: state => state.issues,

  getIssuesByStateShow: (state, stateShow) => fromIssue.getIssuesByStateShow(state, stateShow),
};
