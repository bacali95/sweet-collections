const Heap = require('../dist').Heap;
const HeapSet = require('collections/heap');
const { getData } = require('./utils');

let heap = new HeapSet({}, undefined, (a, b) => a - b);
let heap1 = new Heap((a, b) => a > b);
let data = getData();
let entries = Object.values(data).slice(0, 1000000).map(parseFloat);

console.log('Setting:');
let date = Date.now();
for (const value of entries) {
    heap.push(value);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const value of entries) {
    heap1.push(value);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);

console.log('\nGetting:');
date = Date.now();
for (const value of entries) {
    heap.pop();
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const value of entries) {
    heap1.pop();
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);
