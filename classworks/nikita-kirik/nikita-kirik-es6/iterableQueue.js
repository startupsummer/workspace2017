const Queue = require('./queue');

class IterableQueue extends Queue {
  getIterator() {
    const that = this;
    return function* () {
      for (let i = 0; i < that.storage.length; i+=1) {
        yield that.storage[i];
      }
    };
  }
}

module.exports = IterableQueue;
