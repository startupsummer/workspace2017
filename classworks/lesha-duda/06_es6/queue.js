export default class Queue {
  constructor(size) {
    this.queueSize = size;
    this.amount = 0;
    this.data = [];
  }

  isEmpty() {
    if (this.amount === 0) {
      return true;
    }
    return false;
  }

  isFull() {
    if (this.amount >= this.queueSize) {
      return true;
    }
    return false;
  }

  enqueue(value) {
    if (!this.isFull()) {
      this.data.push(value);
      this.amount += 1;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.amount -= 1;
    return this.data.shift();
  }

  peek() {
    if (!this.isEmpty()) {
      return this.data[0];
    }
    return undefined;
  }

  size() {
    return this.amount;
  }

  sort(func) {
    this.data.sort(func);
  }
}
