export default class Queue {
    constructor(maxSize = 10) {
        this.maxSize = maxSize;
        this.size = 0;
        this.listItem = [];
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.maxSize;
    }

    enqueue(element) {
        this.listItem.push(element);
        this.size++;  
    }

    dequeue() {
        if(!isEmpty()) {
            this.size--; 
            return this.listItem.shift();
        }  
    }

    peek() {
        if(!isEmpty()) {
            return this.listItem.splice(0, 1); 
        }
    }

    sort(comparator) {
        return this.listItem.sort(comparator);
    }

    get currentSize() {
        return this.size;
    }
}


