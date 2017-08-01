
export const getIssuesCount = (store, filterState) =>  {
  if (filterState) {
    const filtered = store.issues.filter(issue =>
      issue.state === filterState
    );
    return filtered.length;
  }
  return store.issues.length;
}

export const getIssue = (store, id) => {
  return store.issues.find(issue => issue.id === id);
}

export const getIssues = (store, filterState, filterTitle) => {
  let filtered = store.issues;
  if (filterTitle) {
    const unStrictFilter = filterTitle.toLowerCase();
    filtered = filtered.filter(item => item.title
      .toLowerCase()
      .startsWith(unStrictFilter)
    );
  }
  if (filterState) {
    filtered = filtered.filter(issue =>
      issue.state === filterState
    );
  }
  return filtered;
};
