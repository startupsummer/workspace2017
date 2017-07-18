export function getIssueById(state, id) {
  return state.data(issue => issue.id === id);
}
