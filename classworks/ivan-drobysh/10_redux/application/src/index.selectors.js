import * as fromIssue from './resources/selectors';


export default {
  getIssueById: (state, listId) =>
    fromIssue.getIssueById(state.cards, listId),

  getIssues: state => {
    return state.issues;
  }
};
