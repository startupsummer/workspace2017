const Queue = require('./queue.js');

class IterableQueue extends Queue {
  constructor(){
    super();
  }
  getIterator() {
    const self = this;
    return function* a() {
      for (const i of self.storage) {
        yield i;
      }
    };
  }
}

module.exports = IterableQueue;
