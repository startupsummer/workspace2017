module.exports = class Queue {

  constructor(maxSize) {
    this._queue = [];
    this.maxSize = maxSize;
  }

  enqueue(element) {
    if (this._queue.length < this.maxSize) {
      this._queue.push(element);
      return true;
    }
    return false;
  }

  dequeue() {
    return this._queue.shift();
  }

  isEmpty() {
    return this._queue.length === 0;
  }

  isFull() {
    return this._queue.length === this.maxSize;
  }

  peek() {
    return this._queue[0];
  }

  getSize() {
    return this._queue.length;
  }

  sort(comparator) {
    this._queue.sort(comparator);
  }
};
