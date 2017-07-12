import Queue from './queue';
import 'babel-polyfill';

export default class iterableQueue extends Queue {
    constructor() {
        super();
    }
    
    getIterator() {
        const self = this;
        return function* getGenerator() {
            while (self.currentSize > 0) {
                yield self.dequeue();
            }  
        }
    } 
}