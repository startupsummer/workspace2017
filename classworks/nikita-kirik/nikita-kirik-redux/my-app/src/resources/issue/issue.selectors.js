export const issuesSelector = state => state;

export const openCounter = state => state.filter(
  item => item.state === 'open'
).length;

export const closedCounter = state => state.filter(
  item => item.state === 'closed'
).length;
