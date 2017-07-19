export function issueAdd() {
  return  fetch('https://api.github.com/repos/SuperKirik/Issues-for-react-introduct-2/issues?state=all&access_token=4d2165c72dc4242333e9ffafe6cf3342f1644241', {
    method: "POST",
    body: JSON.stringify({
      id: Math.random()*1000,
      body: "",
      title: 'Totally New 3!',
      state: "open",
    })
  })
  .then(response  => response.json());
}

export const fetchIssues = () =>
fetch(
  'https://api.github.com/repos/SuperKirik/Issues-for-react-introduct-2/issues?state=all&access_token=4d2165c72dc4242333e9ffafe6cf3342f1644241'
).then(response => response.json());


export const issueToogle = (IssueNumb, newState) =>
  fetch(
    `https://api.github.com/repos/SuperKirik/Issues-for-react-introduct-2/issues/${IssueNumb}?state=all&access_token=4d2165c72dc4242333e9ffafe6cf3342f1644241`,
    {
      method: "PATCH",
      body: JSON.stringify({ state: newState, })
    }
  )
  .then(response  => response.json())
