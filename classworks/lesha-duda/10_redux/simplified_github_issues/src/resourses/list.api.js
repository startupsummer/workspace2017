export function fetchList() {
  return fetch('https://api.github.com/repos/Hellycat/react_test/issues?access_token=d76ef4819f603e1deb94be5479f229abc13a85e9&state=all')
      .then(response => response.json())
}

export function addListItem() {
  return fetch('https://api.github.com/repos/Hellycat/react_test/issues?access_token=d76ef4819f603e1deb94be5479f229abc13a85e9', {
      method: "POST",
      body:JSON.stringify({
        title: Math.random().toString(36).slice(2),
        body: Math.random().toString(36).slice(2),
        state: "open",
      })
    })
    .then(response => response.json())
}

export function closeListItem(number) {
  return fetch(`https://api.github.com/repos/Hellycat/react_test/issues/${number}?access_token=d76ef4819f603e1deb94be5479f229abc13a85e9`, {
      method: "PATCH",
      body:JSON.stringify({
        state: "closed",
      })
    })
    .then(response => response.json())
}
