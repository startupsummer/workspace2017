class Queue {
  constructor() {
    this.head = null;
  }

  // O(1)
  push(value) {
    if (!this.head) {
      this.head = { next: null, value };
    } else {
      const node = { next: this.head, value };
      this.head = node;
    }
  }

  // O(n)
  pop() {
    if (!this.head) {
      throw Error('Pop from empty queue.');
    }
    let node = this.head;
    let prev = null;
    while (node.next) {
      prev = node;
      node = node.next;
    }
    if (!prev) this.head = null;
    else prev.next = null;
  }

  top() {
    if (this.isEmpty()) {
      throw new Error('Empty');
    }
    let node = this.head;
    while (node.next) {
      node = node.next;
    }
    return node.value;
  }

  isEmpty() {
    return !this.head;
  }

  get length() {
    if (!this.head) return 0;
    let node = this.head;
    let len = 1;
    while (node.next) {
      node = node.next;
      len += 1;
    }
    return len;
  }

  static sort(queue, comparator = (first, second) => first < second) {
    const array = [];
    while (!queue.isEmpty()) {
      array.push(queue.top());
      queue.pop();
    }
    array.sort(comparator);
    array.forEach(item => queue.push(item));
  }
}

module.exports = Queue;
