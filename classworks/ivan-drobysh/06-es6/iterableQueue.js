import Queue from './queue';

require('babel-polyfill');

export default class GetIterator extends Queue {
  constructor() {
    super(100);
  }
  getIterator() {
    const self = this;
    return function* getIterator() {
      let i = self.queue.length - 1;
      while (i >= 0) {
        yield self.dequeue();
        i -= 1;
      }
    };
  }
}
