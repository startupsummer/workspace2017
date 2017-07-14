## Lecture task

The main objective of the task is to learn `react-router` and Lifecycle

Mandatory task:

1. Finish your previous lecture task.
2. By click on issue show its description. Use `react-router-dom` for that.
3. Use stateless components.
4. Try to optimize your components.

Advanced:

5. Integrate your app with github.

- Create new public repo
- [Generate token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
- use [fetch](https://github.com/github/fetch) to send requests
example of sending request:
```
fetch('https://api.github.com/repos/YourName/YourRepo/issues?access_token=YourToken')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Once finished..

Call a lecturer and show that all works.
