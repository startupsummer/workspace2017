class Queue {
  constructor(queueSize) {
    this.queue = [];
    this.size = queueSize;
  }

  enqueue(queueItem) {
    if (this.queue.length < this.size) {
      this.queue[this.queue.length] = queueItem;
    }
  }

  dequeue() {
    if (this.queue.length >= 0) {
      return this.queue.shift();
    }
    return undefined;
  }

  isEmpty() {
    if (this.queue.length === 0) {
      return true;
    }
    return false;
  }

  isFull() {
    if (this.queue.length === (this.size - 1)) {
      return true;
    }
    return false;
  }

  peek() {
    if (this.queue.length >= 0) {
      return this.queue[0];
    }
    return undefined;
  }

  get getSize() {
    return this.queue.length;
  }

  sort(comparator) {
    this.queue.sort(comparator);
  }
}

export default Queue;
