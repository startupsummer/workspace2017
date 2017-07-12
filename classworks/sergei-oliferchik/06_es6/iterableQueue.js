import AddQueue from './queue';

class IterableQueue extends AddQueue {
  constructor() {
    super();
  }
  get getIterator() {
    const that = this;
    return function* getIterator() {
      while (!that.isEmpty()) {
        yield that.dequeue();
      }
    };
  }
}

export default IterableQueue;
