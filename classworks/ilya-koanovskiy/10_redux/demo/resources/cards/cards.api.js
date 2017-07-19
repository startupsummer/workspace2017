export function fetchCards() {
  return new Promise(resolve => resolve([
    { id: 1, title: 'card 1', listId: 1 },
    { id: 2, title: 'card 2', listId: 2 },
    { id: 3, title: 'card 3', listId: 2 },
  ]));
}

export function cardAdd(listId) {
  const id = Math.trunc(Math.random() * (10 ** 6));

  return new Promise(resolve => resolve({ id, title: `card ${id}`, listId }));
}

export function cardRemove(id) {
  return new Promise(resolve => resolve({ id }));
}
