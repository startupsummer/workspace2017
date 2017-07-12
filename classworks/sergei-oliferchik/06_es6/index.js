import QueueItems from './queueItem';
import IterableQueue from './iterableQueue';

require("babel-polyfill");

const example = new IterableQueue();
const Ivan = new QueueItems('Ivan', 25);
const Sergei = new QueueItems('Sergei', 20);
const Jula = new QueueItems('Jula', 24);
const Iosif = new QueueItems('Iosif', 42);

example.enqueue(Ivan, Sergei, Jula, Iosif);
example.size;
example.sort((a, b) => a.age - b.age);

for (let n of example.getIterator()) {
  console.log(n);
}

example.size;
