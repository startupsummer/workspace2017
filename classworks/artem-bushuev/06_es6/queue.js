class Quere {
  constructor(size) {
    this.max_size = size;
    this.array = [];
  }
  enqueue(element) {
    if (this.size > this.array.length) {
      this.array = [...this.array, element];
    }
  }
  dequeue() {
    const element = this.array[0];
    this.array.shift();
    return element;
  }
  isEmpty() {
    return Boolean(this.array.length);
  }
  isFull() {
    return this.array.length === this.size;
  }
  peek() {
    return this.array[0];
  }
  get size() {
    return this.max_size;
  }
  sort(comparator) {
    this.array.sort(comparator);
  }
}

module.exports = Quere;
