export function fetchIssues() {
  return (
    fetch('https://api.github.com/repos/anorsich/github/issues?access_token=f1fb0a1a0c2195baed22e77a76b60b7be2087604&state=all')
    .then(response => response.json())
  );
}

export function addIssue(newIssue) {
  return (
    fetch('https://api.github.com/repos/anorsich/github/issues?access_token=f1fb0a1a0c2195baed22e77a76b60b7be2087604', {
      method: 'POST',
      body: JSON.stringify(newIssue),
    })
      .then(response => response.json())
  );
}

export function changeIssue(number, newIssue) {
  return (
    fetch(`https://api.github.com/repos/anorsich/github/issues/${number}?access_token=f1fb0a1a0c2195baed22e77a76b60b7be2087604`, {
      method: 'PATCH',
      body: JSON.stringify(newIssue),
    })
      .then(response => response.json())
  );
}
