fetch('https://api.github.com/repos/YourName/YourRepo/issues?access_token=YourToken')
  .then(response => response.json())
  .then(data => console.log(data));
