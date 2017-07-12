import QueueItem from './queueItem';
import IterableQueue from './iterableQueue';

require('babel-polyfill');

function lengthComparator(a, b) {
  return a - b;
}

const queue = new IterableQueue(10);
const queueItem1 = new QueueItem('aaa');
queue.enqueue(queueItem1);
const queueItem2 = new QueueItem('bbb');
queue.enqueue(queueItem2);
console.log(queue.getSize);

queue.sort(lengthComparator);

for (const elem of (queue.getIterator()())) {
  console.log(elem);
}

console.log(queue.size);
