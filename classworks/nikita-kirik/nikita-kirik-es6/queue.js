require('./queueItem');

class Queue {
  constructor() {
    this.storage = [];
  }

  enqueue(val) {
    this.storage.push(val);
  }

  dequeue() {
    const removed = this.storage.splice(0, 1);
    return removed;
  }

  isEmpty() {
    return !this.storage.length;
  }

  isFull() {
    return !this.isFull();
  }

  sort(comparator) {
    this.storage.sort(comparator);
  }

  peek() {
    return this.storage[0];
  }

  size() {
    return this.storage.length;
  }

}

module.exports = Queue;
