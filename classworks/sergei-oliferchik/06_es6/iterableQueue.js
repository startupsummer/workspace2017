import AddQueue from './queue';

class IterableQueue extends AddQueue {
  constructor() {
    super();
  }
  get getIterator() {
    const that = this;
    return function* getIterator() {
      while (that.queue.length !== 0) {
        yield that.dequeue();
      }
    };
  }
}

export default IterableQueue;
