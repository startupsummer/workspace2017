export const fetchIssues = payload => ({ type: 'FETCH_ISSUES', payload });

export const changeIssueState = payload => ({
  type: 'CHANGE_ISSUE_STATE',
  payload,
});

export const addIssue = payload => ({
  type: 'ADD_ISSUE',
  payload,
});
