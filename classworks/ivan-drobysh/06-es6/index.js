import q from './queueItem';

q.enqueue(10);
q.enqueue(11);
q.enqueue(12);
q.enqueue(13);
q.enqueue(17);
console.log(q.size());

q.sort();

const iter = q.getIterator()();
for (const value of iter) {
  console.log(value);
}

console.log(q.size());
