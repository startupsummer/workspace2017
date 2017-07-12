const IterableQueue = require('./iterableQueue');

const iterableQueueObj = new IterableQueue(5);

iterableQueueObj.enqueue('Paralect');
iterableQueueObj.enqueue('Startup');
iterableQueueObj.enqueue('Summer');

console.log(iterableQueueObj.getSize());

function lengthComparator({ length: length1 }, { length: length2 }) {
  return length1 - length2;
}

iterableQueueObj.sort(lengthComparator);

const generator = iterableQueueObj.getIterator();
for (const element of generator()) {
  console.log(element);
}
