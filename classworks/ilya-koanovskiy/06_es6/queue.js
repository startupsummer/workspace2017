class Queue {
  constructor(size = 10) {
    this.length = size;
    this.arr = [];
  }

  enqueue(item) {
    this.arr.push(item);
  }

  dequeue() {
    return this.arr.shift();
  }

  isEmpty() {
    if (this.arr.length === 0) return true;
    return false;
  }

  isFull() {
    if (this.arr.length === this.size) return true;
    return false;
  }

  peek(index) {
    return this.arr[index];
  }

  size() {
    return this.arr.length;
  }

  sort(comparator) {
    return this.arr.sort(comparator);
  }
}

module.exports = Queue;
