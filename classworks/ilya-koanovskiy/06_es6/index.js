const IterableQueue = require('./iterableQueue.js');
const QueueItem = require('./queueItem');


const queue = new IterableQueue(10);

queue.enqueue(new QueueItem('vasya', 12));
queue.enqueue(new QueueItem('petya', 13));
queue.enqueue(new QueueItem('alina', 22));
queue.enqueue(new QueueItem('leha', 11));
queue.enqueue(new QueueItem('ilya', 2));
queue.enqueue(new QueueItem('vanya', 14));
queue.enqueue(new QueueItem('valera', 12));

console.log(`Size of queue: ${queue.size()}`);

queue.sort((a, b) => a.age > b.age);

const gen = queue.getIterator()();


console.log('Print items by iterator:');

for (const item of gen) {
  console.log(item);
}

console.log(`Size of queue: ${queue.size()}`);
