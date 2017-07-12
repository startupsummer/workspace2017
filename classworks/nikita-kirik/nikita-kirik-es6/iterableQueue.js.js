const Queue = require('./queue');

class IterableQueue extends Queue {
  getIterator() {
    const that = this;
    return function* () {
      for (const value of that.storage) {
        yield value;
      }
    };
  }
}

module.exports = IterableQueue;
