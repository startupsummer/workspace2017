export function fetchIssues() {
  return new Promise(resolve => resolve([
    { id: 1, title: "Issue 1", state: "open", description: "Mauris in arcu ut purus bibendum euismod a sed mauris. Vestibulum ante." },
    { id: 2, title: "Issue 2", state: "closed", description: "Pellentesque posuere rhoncus quam vel dapibus. Nunc feugiat, lectus in egestas egestas."  },
    { id: 3, title: "Issue 3", state: "open", description: "Fusce pharetra suscipit blandit. Sed semper urna augue, vel suscipit libero interdum."  },
    { id: 4, title: "Issue 4", state: "closed", description: "Vivamus dolor ex, tempor in ante ut, ornare commodo neque. Donec consequat."  },
    { id: 5, title: "Issue 5", state: "open", description: "Duis commodo risus sit amet quam commodo hendrerit. Donec sagittis posuere augue."  },
    { id: 7, title: "Issue 7", state: "open", description: "Donec consequat, lectus in egestas egestas."  },
  ]));
}

export function newIssue(lastIssueId) {
  return new Promise(resolve => resolve(
    { id: lastIssueId + 1, title: "New Issue", state: "open", description: "Issue description" },
  ));
}

export function closeIssue(id) {
  return new Promise(resolve => resolve(id));
}
