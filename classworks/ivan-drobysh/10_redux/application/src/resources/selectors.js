export function getIssuesShowNow(state) {
  let stateShow = '';
  if (state.stateShow !== 'all') stateShow = state.stateShow;
  return state.issues.filter(issue => (issue.title.toLowerCase().includes(state.searchRequest.toLowerCase()) &&
  issue.state.includes(stateShow)));
}

export function getIssuesByStateShow(state, stateShow) {
  let close = 0, open = 0;
  open = state.issues.reduce(
    (previousValue, currentValue, index, array)=> {
    if(currentValue.state === 'open')
      return previousValue + 1;
    return previousValue;
  }, 0);
  close = state.issues.length - open;
  if( stateShow === 'open' ) return open
  else return close;
}
