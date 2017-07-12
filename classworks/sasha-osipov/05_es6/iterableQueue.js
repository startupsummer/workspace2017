import Queue from './queue';
import 'babel-polyfill';

export default class iterableQueue extends Queue {
    constructor() {
        super();
    }
    
    getIterator() {
        const self = this;
        return function* getGenerator() {
            for(let value of self.listItem) {
                yield value;
            }  
        }
    } 
}