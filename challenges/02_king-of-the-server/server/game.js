'use strict';
const R = require('ramda');
let current = 'start';
let lastChange = Date.now();
const points = {};

function getTable() {
    return R.pipe(
        R.toPairs,
        R.sortBy(R.pipe(R.last, R.negate))
    )(points);
}

function displayTable() {
    console.log('--------------------');
    console.log('current: ' + current);
    R.pipe(
        R.addIndex(R.map)((pair, i) => `${i + 1}: ${pair[1]} - ${pair[0]}`),
        R.forEach(row => console.log(row))
    )(getTable());
    console.log('--------------------');
}

module.exports = {
    get: () => current,
    set: name => {
        points[current] = (points[current] || 0) + (Date.now() - lastChange);
        current = name;
        lastChange = Date.now();
        displayTable();
    }
};
