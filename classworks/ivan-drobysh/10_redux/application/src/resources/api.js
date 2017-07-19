
export function fetchIssues() {
  return fetch('https://api.github.com/repos/Ivanko5417/google/issues?access_token=c2bca6983f3a5881e7d364c6d300e659862617b2&state=all')
  .then((resp) => resp.json());
}

export function newIssue() {
  return fetch('https://api.github.com/repos/Ivanko5417/google/issues?access_token=c2bca6983f3a5881e7d364c6d300e659862617b2', {
    method: 'POST',
    body: JSON.stringify({
      title: 'My issue',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }),
  }).then((resp) => resp.json());
}
//
export function switchState(item) {
  let stateItem = item.state;
    stateItem === 'open'
    ? stateItem = 'closed'
    : stateItem = 'open';
  return fetch(`https://api.github.com/repos/Ivanko5417/google/issues/${item.number}?access_token=c2bca6983f3a5881e7d364c6d300e659862617b2`, {
    method: 'PATCH',
    body: JSON.stringify({
      state: stateItem,
    }),
  }).then((resp) => resp.json());
}

export function  setSearchRequest(event){
  const searchText = event.currentTarget.value.toLowerCase();
  return Promise.resolve(searchText);
}
//
// showIssues = () => {
//   let issues =  this.state.issuesAll.filter((item) => item.title.toLowerCase().indexOf(this.state.searchText) !== -1);
//   let state = this.state.stateShow;
//   if(state !== 'all')  {
//     issues = this.state.issuesAll.filter((item) => item.state === state);
//     return issues;
//   }
//   else {
//     return issues;
//   }
// }
 export function setStateShow(stateShow){
   return Promise.resolve(stateShow);
 }
