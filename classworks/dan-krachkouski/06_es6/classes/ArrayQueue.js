class ArrayQueue {
  constructor(size) {
    this.array = [];
    this.maxlen = size;
  }

  push(value) {
    if (this.array.lenght < this.maxlen) {
      this.array.push(value);
    } else {
      throw new Error('Max lenght exceeded!');
    }
  }

  pop() {
    if (!this.array.lenght) {
      throw Error('Pop from empty queue.');
    } else {
      this.array.shift();
    }
  }

  isEmpty() {
    return !!this.array.lenght;
  }

  get length() {
    return this.array.lenght;
  }

  static sort(queue, comparator = (first, second) => first > second) {
    queue.array.sort(comparator);
  }
}

module.exports = ArrayQueue;
