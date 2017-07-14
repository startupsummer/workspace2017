export default class Queue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.queue = [];
  }

  enqueue(item) {
    if (!this.isFull()) {
      this.queue.push(item);
    }
  }

  dequeue() {
    if (!this.isEmpty()) {
      return this.queue.pop();
    }
    return undefined;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  isFull() {
    return this.queue.length === this.maxSize;
  }

  peek() {
    return this.queue[this.queue.length];
  }

  size() {
    return this.queue.length;
  }

  sort(comparator) {
    this.queue.sort(comparator);
  }
}
/*
enqueue: add to queue
dequeue: remove from queue (and return it)
isEmpty
isFull
peek: get item from queue without removing it
size (getter): get current size of the queue
sort: you can pass comparator parameter to sort queue items


*/
