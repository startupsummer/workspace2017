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
