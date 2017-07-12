import 'babel-polyfill';
import Queue from './queue';

class IterableQueue extends Queue {
  getIterator() {
    const self = this;
    return function* it() {
      for (const value of self.data) {
        yield value;
      }
    };
  }
}

export default IterableQueue;
