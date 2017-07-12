const Queue = require('./Queue.js');

class IterableQueue extends Queue {
  * getIterator() {
    if (this.isEmpty()) {
      throw new Error('Empty queue!');
    }
    let node = this.head;
    while (node.next) {
      yield node.value;
      node = node.next;
    }
    yield node.value;
  }
}

module.exports = IterableQueue;
