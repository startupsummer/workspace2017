export default (state = { issues: [], issuesState: 'open', value: '' }, action) => {
  switch (action.type) {
    case 'fetchIssues':
      return { ...state, issues: action.payload }
    case 'addIssue':
      const newIssues = [...state.issues, action.payload]
      return { ...state, issues: newIssues }
    case 'IssuesState':
      return { ...state, issuesState: action.state }
    case 'changeIssue':
      const newList = state.issues.map(item => item.id === action.payload.id ? action.payload : item)
      return { ...state, issues: newList }
    case 'searchIssues':
      return { ...state, value: action.value }
    default:
      return state;
  }
};
