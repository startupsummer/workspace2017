import * as get from 'resources/issues/issues.selectors';

export default {
  getIssuesList: state => get.fromStore(state.issuesList),
  getSearchQuery: state => get.fromStore(state.searchQuery),
  getIssuesState: state => get.fromStore(state.issuesState),
}
