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

function promise(val, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, ms);
  });
}

console.log('begin');
Promise.all(queue.storage.map(item => promise(item, 1000 * item.value)))
.then((values) => {
  console.log(values);
});

promise(1, 1000)
.then((i) => {
  return promise(i + 1, 1000);
})
.then((i) => {
  return promise(i + 1, 1000);
})
.then((i) => {
  return promise(i + 1, 1000);
})
.then((i) => {
  return promise(i + 1, 1000);
})
.then(console.log);

async function kek() {
  let i = await promise(1, 1000);
  i = await promise(i + 1, 1000);
  i = await promise(i + 1, 1000);
  console.log(i);
}
kek();
