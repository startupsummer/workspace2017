export function fetchIssues() {
  return new Promise(resolve => resolve([
    { id: 1, title: "Issue 1", state: "open" },
    { id: 2, title: "Issue 2", state: "closed" },
    { id: 3, title: "Issue 3", state: "open" },
    { id: 4, title: "Issue 4", state: "closed" },
    { id: 5, title: "Issue 5", state: "open" },
    { id: 7, title: "Issue 7", state: "open" },
  ]));
}

export function newIssue(lastIssueId) {
  return new Promise(resolve => resolve(
    { id: lastIssueId + 1, title: "New Issue", state: "open" },
  ));
}

export function closeIssue(id) {
  return new Promise(resolve => resolve(id));
}
