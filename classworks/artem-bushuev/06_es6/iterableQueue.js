const Queue = require('./queue');

class IterableQueue extends Queue {
  getIterator() {
    const generator = function* generator(array) {
      for (let i = 0; i < array.length; i += 1) {
        yield array[i];
      }
    };
    return generator(this.array);
  }
}

module.exports = IterableQueue;
