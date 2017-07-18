export function getIssueByWord(state) {
  return state.issues.filter(issue => issue.title.toLowerCase().indexOf(state.searchRequest.toLowerCase()) !== -1);
}
