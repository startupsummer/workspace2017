const Queue = require('./queue.js');

class IterableQueue extends Queue {
  getIterator() {
    const self = this;
    return function* gen() {
      for (const value of self.arr) {
        yield value;
      }
    };
  }
}

module.exports = IterableQueue;
