class AddQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(...args) {
    args.forEach(cur => this.queue.push(cur));
    return this.queue;
  }

  dequeue() {
    this.queue.shift();
    return this.queue;
  }

  isEmpty() {
    return !this.queue.length;
  }

  isFull() {
    return !!this.queue.length;
  }

  peek() {
    const length = this.queue.length;
    return this.queue[length - 1];
  }

  get size() {
    console.log(this.queue.length);
    return this.queue.length;
  }

  sort(func) {
    const assort = this.queue.sort(func);
    console.log(assort);
    return assort;
  }
}

export default AddQueue;
