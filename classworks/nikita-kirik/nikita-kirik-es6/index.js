const QueueItem = require('./queueItem');
const IterableQueue = require('./iterableQueue');

const iterableQ = new IterableQueue();

iterableQ.enqueue(new QueueItem());
iterableQ.enqueue(new QueueItem(true, 12));
iterableQ.enqueue(new QueueItem(false, 2));

console.log(iterableQ.size);

iterableQ.sort((a, b) => a.number - b.number);

const generator = iterableQ.getIterator();
const iterator = generator();

for (const item of iterator) { // eslint-disable-line
  console.log(item);
}

iterableQ.dequeue();

console.log(iterableQ.size);


const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('!!!'), 1000);
  reject('???');
});

promise.then(
  (result) => {
    console.log(`Resolve: ${result}`);
  },
  (error) => {
    console.log(`Rejected: ${error}`);
  });
