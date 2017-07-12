const Queue = require('./queue');
const QueueItem = require('./queueItem');
const IterableQueue = require('./iterableQueue');

const q = new Queue();
const iterableQ = new IterableQueue();

console.log(q.enqueue(12));
console.log(q.dequeue(12));

iterableQ.enqueue(new QueueItem());
iterableQ.enqueue(new QueueItem(true, 12));
iterableQ.enqueue(new QueueItem(false, 2));

console.log(iterableQ.size);

iterableQ( (a, b) => {
  return a.number - b.number;
});

for (item of iterableQ) {
  console.log(item + ' ');
}

console.log(iterableQ.size);
