import QueueItem from './queueItem';
import IterableQueue from './iterableQueue';

const testQueue = new IterableQueue(5);

function comp(a, b) {
  return a.age - b.age;
}

testQueue.enqueue(new QueueItem());
testQueue.enqueue(new QueueItem('Sasha', 21));
testQueue.enqueue(new QueueItem('Olya', 84));
testQueue.enqueue(new QueueItem('Ivan', 11));

console.log(`size: ${testQueue.size()}`);

testQueue.sort(comp);

for (const value of testQueue.data) {
  console.log(value);
}

console.log(`size: ${testQueue.size()}`);
