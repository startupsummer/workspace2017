import { displayAll } from './utils';

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