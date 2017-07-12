const IterableQueue = require('./classes/IterableQueue.js');
const QueueItem = require('./classes/QueueItem.js');

const queue = new IterableQueue();

[
  { name: 'dan', surname: 'kr' },
  { name: 'andrew', surname: 'orsich' },
  { name: 'sergey ', surname: 'gavruk' },
  { name: 'artem', surname: 'bushuev' },
  { name: 'mark', surname: 'chepicov' },
].forEach(({ name, surname }) =>
  queue.push(new QueueItem(name, surname),
));

console.log(`size: ${queue.length}`);

IterableQueue.sort(queue, (first, second) =>
  first.name < second.name,
);

const iterator = queue.getIterator();

for (const item of iterator) {
  console.log(item);
}

console.log(`size: ${queue.length}`);

function resolveAfter(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

console.log('Promises started');

Promise.all([1, 2, 3, 4, 5]
  .map(i => resolveAfter(i, 1000 * i)))
.then((values) => {
  console.log(`Promises says: ${values}`);
});

console.log('Async started');

async function sameButAsync() {
  const one = await resolveAfter(1, 1000);
  const two = await resolveAfter(2, 2000);
  const three = await resolveAfter(3, 3000);
  console.log('Async says: ', one, two, three);
}

sameButAsync(); // not the same
