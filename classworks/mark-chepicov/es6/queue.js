class Queue {
  constructor() {
    this.storage = [];
    this.maxSize = 1000;
  }
  enqueue(data) {
    this.storage[this.storage.length] = data;
  }
  dequeue() {
    const a = this.storage[0];
    this.storage.splice(0, 1);
    console.log(a);
    return a;
  }
  isEmpty() {
    return this.storage.length === 0;
  }
  isFull() {
    return this.storage.length === this.maxSize;
  }
  peek() {
    return this.storage[0];
  }
  get size() {
    return this.storage.length;
  }
  sort(comparator) {
    this.storage.sort(comparator);
  }
}

module.exports = Queue;
