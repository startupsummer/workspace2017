export function fetchIssues() {
    return fetch('https://api.github.com/repos/Fusionqq/GitHub-Issues/issues?access_token=39b27afcbfd15dda6d0cd88c02936095fb462ee3&state=all')
    .then(response => response.json())
}

export function addIssue() {
    const newItem = {
        state : "open",
        title : "Hello, it's me",
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel suscipit leo. Mauris ultricies, leo sit amet accumsan ultricies, arcu ipsum tempus libero, non tincidunt arcu est ac elit.`,
    }

    return fetch(`https://api.github.com/repos/Fusionqq/GitHub-Issues/issues?access_token=39b27afcbfd15dda6d0cd88c02936095fb462ee3`, {
        method: 'POST',
        body: JSON.stringify(newItem),
    })
    .then(response => response.json())
}

export function changeIssue(number, state) {
    return fetch(`https://api.github.com/repos/Fusionqq/GitHub-Issues/issues/${number}?access_token=39b27afcbfd15dda6d0cd88c02936095fb462ee3`, {
        method: 'PATCH',
        body: JSON.stringify({
            state
        })
    })
    .then(response => response.json())
}
