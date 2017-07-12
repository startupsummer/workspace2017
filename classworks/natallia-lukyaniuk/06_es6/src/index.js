import Queue from './Queue';

const queue = new Queue(7);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
queue.enqueue(8);
// console.log(queue.isFull());
console.log(queue);
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// console.log(queue.isEmpty());
