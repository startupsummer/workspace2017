const Queue = require('./queue.js');
const QueueItem = require('./queueItem.js');
const IterableQueue = require('./iterableQueue.js');

const myIterableQueue = new IterableQueue(5);

const myQueueItem1 = new QueueItem('Alex', 100);
const myQueueItem2 = new QueueItem('John', 25);
const myQueueItem3 = new QueueItem('Peter', 50);

myIterableQueue.enqueue(myQueueItem1);
myIterableQueue.enqueue(myQueueItem2);
myIterableQueue.enqueue(myQueueItem3);

console.log(myIterableQueue.listItem.length);

const compareAge = (a, b) => {
  if (a.age > b.age) return 1;
  if (a.age < b.age) return -1;
  return 0;
}

myIterableQueue.sort(compareAge);

const generator = myIterableQueue.getIterator()();

for (let value of generator) {
  console.log(`Name: ${value.name}, Age: ${value.age}`);
}

console.log(myIterableQueue.listItem.length);
