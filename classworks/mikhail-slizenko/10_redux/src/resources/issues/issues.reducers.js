const initialState = {
  issuesList: [],
  searchQuery: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'fetchIssuesList':
      return {...state, issuesList: action.payload};

    case 'openNewIssue':
      const issuesList = [...state.issuesList, action.payload];
      return {...state, issuesList};

    case 'changeIssue':
      const newIssuesList = state.issuesList.map(issue =>
        issue.id === action.payload.id
          ? action.payload
          : issue);
      return {...state, issuesList: newIssuesList};

    case 'searchQuery':
      return {...state, searchQuery: action.searchQuery};
    
    default:
      return state;
  }
};
