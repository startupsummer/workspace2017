import Node from './Node';

class Queue {
  constructor(size) {
    this.head = null;
    this.tail = null;
    this.maxSize = size;
    this.size = 0;
  }
  enqueue(data) {
    if (this.isFull()) {
      throw new Error('Queue is full');
    } else {
      if (this.head === null) {
        this.tail = new Node(data, null);
        this.head = this.tail;
      } else {
        this.tail.next = new Node(data, null);
        this.tail = this.tail.next;
      }
      this.size += 1;
    }
  }
  dequeue() {
    let result = null;
    if (this.head === null) {
      return result;
    }
    result = this.head.data;
    this.head = this.head.next;
    this.size -= 1;
    return result;
  }
  isEmpty() {
    return Boolean(!this.size);
  }
  isFull() {
    return this.size === this.maxSize;
  }
  peek() {
    let result;
    if (this.head === null) {
      result = null;
    } else {
      result = this.head.data;
    }
    return result;
  }
  get currentSize() {
    return this.size;
  }
  // sort(comparator) {

  // }
}

export default Queue;
