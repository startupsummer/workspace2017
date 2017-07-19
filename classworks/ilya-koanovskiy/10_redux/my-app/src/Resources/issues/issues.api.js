export function fetchIssues() {
  return fetch('https://api.github.com/repos/i-kohan/test2/issues?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e&state=all')
    .then(response => response.json())
}

function makeStr(num){
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < num; i++){
      if(i%50 === 0){
        text+="\n"
      }
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

export function addIssue() {
  return fetch('https://api.github.com/repos/i-kohan/test2/issues?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e',{
      method:"POST",
      body:JSON.stringify({
        title: makeStr(10),
        body: makeStr(200),
        state:"open"
      })
    })
    .then(response => response.json())
}

export function changeIssue(number) {
  console.log(number);
  return fetch(`https://api.github.com/repos/i-kohan/test2/issues/${number}?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e`,{
      method:"PATCH",
      body:JSON.stringify({
        state:"close"
      })
    })
    .then(response => response.json())
}

