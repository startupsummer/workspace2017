import Queue from './Queue';
import IterableQueue from './IterableQueue';

require('babel-polyfill');

const iterableQueue = new IterableQueue(7);
iterableQueue.enqueue(1);
iterableQueue.enqueue(2);
iterableQueue.enqueue(3);
iterableQueue.enqueue(4);
iterableQueue.enqueue(5);
iterableQueue.enqueue(6);
console.log(iterableQueue.currentSize);
const it = iterableQueue.getIterator();
console.log(iterableQueue.sort((a, b) => b.data - a.data));
for (let value of it()) {
  console.log(value);
}
console.log(iterableQueue.currentSize);
