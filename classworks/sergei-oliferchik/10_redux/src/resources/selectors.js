export const getIssuesById = (state, id)  => (
  state.filter(issue => issue.id === id)
)

export const getIssuesByNumber = (state, number)  => (
  state.filter(issue => issue.number === number)
)

export const getOpensIssues = (state) => (
  state.filter(issue => issue.state === 'open')
);

export const getClosedsIssues = (state) =>
  state.filter(issue => issue.state === 'closed');
