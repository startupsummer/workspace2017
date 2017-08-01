const repo = 'https://api.github.com/repos/danilyanich/special-waffle';
const access_token = 'bfc4541d21741c3b3e3e20e9b407b4f84d1686fa';


export const fetchIssues = () =>
  fetch(`${repo}/issues?access_token=${access_token}&state=all`)
  .then(response => response.json())
  .then(data => data.filter(issue => !issue.pull_request));


export const setIssueState = (issueNumber, nextState) =>
  fetch(`${repo}/issues/${issueNumber}?access_token=${access_token}`, {
    method: 'PATCH',
    body: JSON.stringify({
      state: nextState
    })
  })
  .then(response => response.json());


export const openIssue = (newIssue) =>
  fetch(`${repo}/issues?access_token=${access_token}`, {
    method: 'POST',
    body: JSON.stringify(newIssue)
  })
  .then(response => response.json());
