import Queue from './Queue';

export default class IterableQueue extends Queue {
  getIterator() {
    const that = this;

    return function* iterate() {
      for (let i = 0; i < that.memory.length; i++) {
        yield that.memory[i];
      }
    }; 
  } 
}
