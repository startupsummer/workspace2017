export function fetchItems() {
  return fetch('https://api.github.com/repos/chepicov/react/issues?state=all;access_token=9294d42dc8c23075967707aa366e867931fcb2d6')
    .then(response => response.json());
}

export function itemAdd() {
  return fetch(
    'https://api.github.com/repos/chepicov/react/issues?state=all;access_token=9294d42dc8c23075967707aa366e867931fcb2d6', 
    {
      body: JSON.stringify({ 
        title: 'Lorem ipsum', 
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", 
        state: 'open'
      }),
      method: 'POST'
    }
  )
  .then(response => response.json())
}

export function itemOpen(id, number) {
  return fetch(
    `https://api.github.com/repos/chepicov/react/issues/${number}?access_token=9294d42dc8c23075967707aa366e867931fcb2d6`, 
    {
      body: JSON.stringify({
        state: 'open'
      }),
      method: 'PATCH'
    }
  )
  .then(response => response.json());
}

export function itemClose(id, number) { 
  return fetch(
    `https://api.github.com/repos/chepicov/react/issues/${number}?access_token=9294d42dc8c23075967707aa366e867931fcb2d6`, 
    {
      body: JSON.stringify({
        state: 'closed'
      }),
      method: 'PATCH'
    }
  )
  .then(response => response.json());
}
