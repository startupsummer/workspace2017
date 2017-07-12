export default class Queue {
  constructor(mSize) {
    this.mSize = mSize;
    this.memory = [];
  }

  enqueue(node) {
    if (this.memory.length < this.mSize) {
      return this.memory.push(node);  
    }
    return this;
  }

  dequeue() {
    return this.memory.shift();
  }
  
  isEmpty() { 
    return !this.memory.length;
  }
  
  isFull() {
    return this.memory.length === this.mSize;
  }
  
  peek() {
    return (!this.isEmpty()) ? this.memory[0] : undefined;
  }

  sort(comparator) {
    return this.memory.sort(comparator);
  }

  get size() {
    return this.memory.length;
  }
  
}
