import Queue from './Queue';

class IterableQueue extends Queue {
  getIterator() {
    const self = this;
    function* generator() {
      while (!self.isEmpty()) {
        yield self.dequeue();
      }
    }
    return generator;
  }
}

export default IterableQueue;
