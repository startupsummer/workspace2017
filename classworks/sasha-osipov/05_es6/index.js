import queue from './queueItem';

queue.enqueue(5);
queue.enqueue(1);
queue.enqueue('Sasha');
queue.enqueue('Osipov');

console.log('size: ' + queue.currentSize);

function compare(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
}

queue.sort(compare);

const generator = queue.getIterator()();

for (let value of generator){
    console.log('value: ' + value);
}

console.log('size: ' + queue.currentSize);

