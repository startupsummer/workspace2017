export function fetchIssues() {
  return new Promise(resolve => resolve([
    { id: 1, title: "Issue 1", state: "open" },
    { id: 2, title: "Issue 2", state: "cloed" },
    { id: 3, title: "Issue 3", state: "open" },
  ]));
}
