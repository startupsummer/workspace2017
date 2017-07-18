import * as fromIssue from './resources/selectors';


export default {
  getIssuesByWord: (state) =>
    fromIssue.getIssueByWord(state),

  getIssues: state => {
    return state.issues;
  }
};
