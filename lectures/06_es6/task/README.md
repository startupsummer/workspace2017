## Lecture task

The main objective of the task is to try ES6 in practice and configure eslint with airbnb config.

### Mandatory task:

Build a `Queue` which accepts queue size in constructor with the following functionality:

1. `enqueue`: add to queue
2. `dequeue`: remove from queue (and return it)
3. `isEmpty`
4. `isFull`
5. `peek`: get item from queue without removing it
6. `size` (getter): get current size of the queue
7. `sort`: you can pass `comparator` parameter to sort queue items

Build `IterableQueue` which extends your queue with `getIterator` which returns generator function

Build 3 classes:

1. `queueItem.js`: queue object
2. `queue.js`: queue
3. `iterableQueue.js`: iterable queue

index.js:

1. create iterable queue
2. add few items to the queue
3. print queue size
4. sort queue items by any field
5. iterate over queue using `for ... of` and print each item
6. print queue size

Install [eslint airbnb config](https://www.npmjs.com/package/eslint-config-airbnb) and run it. If it shows errors - fix them

### Advanced:

Try to extend this project with more ES6/7 features (promises, async/await).
Integrate `eslint` with your IDE/text editor
