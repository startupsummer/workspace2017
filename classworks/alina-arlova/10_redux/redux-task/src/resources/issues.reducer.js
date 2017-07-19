export default function reducer(state = { issues: [], menuState: 'open', searchText: ''}, action) {
    switch (action.type) {
      case 'fetchIssues':
        return { ...state, issues: action.payload }
      case 'changeMenuState':
        return { ...state, menuState: action.menuState }
      case 'newIssue':
        return { ...state, issues: [...state.issues, action.payload] }
      case 'closeIssue':
        let newIssues = Object.assign([], state.issues);
        newIssues.map( (issue) => {
          if (issue.id === action.id) {
            issue.state = 'closed';
          }
        } );
        return { ...state, issues: newIssues }
      case 'searchIssue':
        return { ...state, searchText: action.text }
      default:
        return state;
    };
};
