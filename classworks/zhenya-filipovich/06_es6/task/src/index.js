import queueItem from './queueItem';

require('babel-polyfill');

function sortFunc(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
} 

queueItem.enqueue(500);
queueItem.enqueue(10);
queueItem.enqueue(198);
queueItem.enqueue(180);
queueItem.enqueue(410);

console.log(queueItem.size);
queueItem.sort(sortFunc); 

// eslint-disable-next-line
for (const elem of (queueItem.getIterator())()) {
  console.log(elem);
}

