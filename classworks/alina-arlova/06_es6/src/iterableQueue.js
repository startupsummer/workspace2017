import Queue from './queue';

class IterableQueue extends Queue {
  getIterator() {
    const self = this;
    let i = 0;
    return function* generator() {
      for (let i = 0; i < self.queue.length; i += 1) {
        yield self.queue[i];
      }
    };
  }
}

export default IterableQueue;
