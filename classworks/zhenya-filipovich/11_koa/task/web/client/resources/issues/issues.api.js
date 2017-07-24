const accessToken = 'c8c50b1970bdd6f537626534103dba0a5dfb4b88';

export const getDataFromServer = () => (
  fetch(`https://api.github.com/repos/filipochka97/react-github/issues?access_token=${accessToken}&state=all&per_page=100`)
    .then(response => response.json())
);

export const addIssues = () => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      title: `Some problems with ${Math.trunc((Math.random() * 200))}`,
      body: 'Description of this problem',
    }),
  };

  return fetch(`https://api.github.com/repos/filipochka97/react-github/issues?access_token=${accessToken}`,
    options)
    .then(response => response.json());
};

export const changeIssueState = (item) => {
  const { number, state } = item;
  const options = {
    method: 'PATCH',
    body: JSON.stringify({
      state: (state === 'open') ? 'closed' : 'open',
    }),
  };

  return fetch(`https://api.github.com/repos/filipochka97/react-github/issues/${number}?access_token=${accessToken}`,
    options)
    .then(response => response.json());
};
