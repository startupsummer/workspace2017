const IterableQueue = require('./iterableQueue.js');
const Item = require('./queueItem.js');

const queue = new IterableQueue();
queue.enqueue(new Item('a', 2));
queue.enqueue(new Item('v', 3));
queue.enqueue(new Item('b', 1));
queue.enqueue(new Item('g', 6));
queue.enqueue(new Item('r', 0));
console.log(queue.size);
queue.sort((a, b) => { return a.value - b.value; });
const a = queue.getIterator()();
for (const val of a) {
    console.log(val);
}
console.log(queue.size);
