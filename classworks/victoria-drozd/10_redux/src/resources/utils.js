export const displayAll = data => data.map(issue => ({
  ...issue,
  display: true
}));

export const countIssues = (data) => {
  let openIssuesCounter = 0, closedIssuesCounter = 0;
  data.forEach((issue) => {
    if (!issue.display) { return; }

    if (issue.state === 'open') {
      openIssuesCounter++;
    } else {
      closedIssuesCounter++;
    }
  });

  return [openIssuesCounter, closedIssuesCounter];
};