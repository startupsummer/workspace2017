import { displayAll } from '../utils';

export function fetchIssues() {
  const TOKEN = '5a46ea30cc32615ddaa1d3683b7567d08e85a07b';

  return fetch(`https://api.github.com/repos/andemerie/01_git_task/issues?access_token=${TOKEN}&state=all`)
    .then(response => response.json())
    .then(data => displayAll(data)
    );
}

export function closeIssue(id) {
  return new Promise(resolve => resolve({id}));
}

export function addNewIssue(data) {
  return new Promise(resolve => resolve({
    id: data[data.length - 1].id + 1,
    title: 'New issue',
    state: 'open'
  }));
}

export function searchText(text) {
  return new Promise(resolve => resolve({text}));
}

export function setCurrentTab() {
  return new Promise(resolve => resolve('open'));
}

export function showOpenTab() {
  return new Promise(resolve => resolve('open'));
}

export function showClosedTab() {
  return new Promise(resolve => resolve('closed'));
}
