const IterableQueue = require('./iterableQueue');
const User = require('./queueItem');

let queue = new IterableQueue(5);

queue.enqueue(new User('user1', 20));
queue.enqueue(new User('user2', 40));
queue.enqueue(new User('user3', 22));
queue.enqueue(new User('user4', 10));

console.log(queue.size);

queue.sort((item1, item2) => item1.age - item2.age);

const iterator = queue.getIterator();
for (const value of iterator) {
  console.log(value);
}
console.log(queue.size);

