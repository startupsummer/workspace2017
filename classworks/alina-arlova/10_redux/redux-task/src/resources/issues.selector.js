export default {
  getIssues: state => state.issues,
  getMenuState: state => state.menuState,
  getIssuesCount: state => state.issues.length,
  getLastIssueId: state => {
    if (state.issues.length > 0 ) {
      return state.issues[state.issues.length - 1].id;
    }
    else {
      return 0;
    }
  },
  getSearchText: state => state.searchText,
};
