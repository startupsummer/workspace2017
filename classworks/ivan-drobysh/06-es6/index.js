import QueueItem from './queueItem';
import IterableQueue from './iterableQueue';

const q = new IterableQueue(10);

q.enqueue(new QueueItem(10));
q.enqueue(new QueueItem(11));
q.enqueue(new QueueItem(25));
q.enqueue(new QueueItem(13));
q.enqueue(new QueueItem(14));
console.log(q.size());

q.sort((a, b) => a.data - b.data);

const iter = q.getIterator()();
for (const value of iter) {
  console.log(value);
}

console.log(q.size());
