module.exports = class Queue {
  constructor(size) {
    this.maxSize = size;
    this.listItem = [];
  }

  enqueue(item) {
    if (!this.isFull()) {
      this.listItem.push(item);
    } else throw new Error('Queue is full!')
  }

  dequeue() {
    if (!this.isEmpty()) {
      return this.listItem.pop();
    } else throw new Error('Queue is empty!')
  }

  pick() {
    if (!this.isEmpty()) {
      return this.listItem[this.listItem.length - 1];
    } else throw new Error('Queue is empty!');
  }

  sort(compareFunc) {
    return this.listItem.sort(compareFunc);
  }

  get getSize() {
    return this.listItem.length;
  }

  isFull() {
    return this.maxSize === this.listItem.length;
  }

  isEmpty() {
    return this.listItem.length === 0;
  }
}


