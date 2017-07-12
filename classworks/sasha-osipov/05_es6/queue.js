export default class Queue {
    constructor(maxSize = 10) {
        this.maxSize = maxSize;
        this.listItem = [];
    }

    isEmpty() {
        return this.listItem.length === 0;
    }

    isFull() {
        return this.listItem.length === this.maxSize;
    }

    enqueue(element) {
        if(!this.isFull()) {
            this.listItem.push(element);  
        } 
    }

    dequeue() {
        if(!this.isEmpty()) {
            return this.listItem.shift();
        }  
    }

    peek() {
        if(!this.isEmpty()) {
            return this.listItem[0]; 
        }
    }

    sort(comparator) {
        return this.listItem.sort(comparator);
    }

    get currentSize() {
        return this.listItem.length;
    }
}


