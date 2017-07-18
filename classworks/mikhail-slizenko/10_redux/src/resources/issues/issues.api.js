export const fetchIssuesList = () =>
  fetch('https://api.github.com/repos/hovoodd/fuzzy-octo-pancake/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc&state=all')
    .then(response => response.json())

export const openNewIssue = () => {
  const newIssueBody = {
      title: 'Missing builtins',
      body: 'Bash shell builtin help is missing in the guide.'
    };

  return fetch('https://api.github.com/repos/hovoodd/fuzzy-octo-pancake/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc', {
    method: 'POST',
    body: JSON.stringify(newIssueBody)
  })
    .then(response => response.json())
}

export const changeIssue = (newIssueState, number) =>
  fetch(`https://api.github.com/repos/hovoodd/fuzzy-octo-pancake/issues/${number}?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc`, {
    method: 'PATCH',
    body: JSON.stringify({
      state: newIssueState
    })})
      .then(response => response.json())
