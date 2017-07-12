import Node from './Node';

class Queue {
  constructor(size) {
    this.queueArray = [];
    this.maxSize = size;
    this.size = 0;
  }
  enqueue(data) {
    if (this.isFull()) {
      throw new Error('Queue is full');
    } else {
      this.queueArray.push(new Node(data));
      this.size += 1;
    }
  }
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const result = this.queueArray.shift();
    this.size -= 1;
    return result;
  }
  isEmpty() {
    return this.size === 0;
  }
  isFull() {
    return this.size === this.maxSize;
  }
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    const result = this.queueArray[0].data;
    return result;
  }
  get currentSize() {
    return this.size;
  }
  sort(comparator) {
    return this.queueArray.sort(comparator);
  }
}

export default Queue;
