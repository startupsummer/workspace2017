import 'babel-polyfill';
import Queue from './queue';

class IterableQueue extends Queue {
  getIterator() {
    const self = this;
    return function* it() {
      for (let i = 0; i < self.data.length; i += 1) {
        yield self.data[i];
      }
    };
  }
}

export default IterableQueue;
