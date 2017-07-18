export function fetchLists() {
  return new Promise(resolve => resolve([
    { id: 1, title: 'list 1' },
    { id: 2, title: 'list 2' },
  ]));
}

export function listAdd() {
  const id = Math.trunc(Math.random() * (10 ** 6));

  return new Promise(resolve => resolve({ id, title: `list ${id}` }));
}

export function listRemove(id) {
  return new Promise(resolve => resolve({ id }));
}
