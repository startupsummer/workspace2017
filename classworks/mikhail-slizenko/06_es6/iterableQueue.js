const Queue = require('./queue.js');

module.exports = class IterableQueue extends Queue {
  getIterator() {
    const self = this;
    return function* getGenerator() {
      for (let i = self.listItem.length; i > 0; i--) {
        yield self.dequeue();
      }
    }
  }
}