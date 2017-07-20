export default (state = { issues: [], issuesState: 'open', value: '' }, action) => {
  let newIssues;
  switch (action.type) {
    case 'fetchIssues':
      return { ...state, issues: action.payload }
    case 'addIssue':
      newIssues = [...state.issues, action.payload]
      return { ...state, issues: newIssues }
    case 'IssuesState':
      return { ...state, issuesState: action.state }
    case 'changeIssue':
      newIssues = state.issues.map(item => item.id === action.payload.id ? action.payload : item)
      return { ...state, issues: newIssues }
    case 'searchIssues':
      return { ...state, value: action.value }
    default:
      return state;
  }
};
