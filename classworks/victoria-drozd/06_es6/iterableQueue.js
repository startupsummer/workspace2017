const Queue = require('./queue');

module.exports = class IterableQueue extends Queue {

  getIterator() {
    const self = this;

    return function* () {
      while (!self.isEmpty()) {
        yield self.dequeue();
      }
    };
  }
};
