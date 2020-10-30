const Sorted = require('../dist').SortedSet;
const SortedSet = require('collections/sorted-set');
const { getData } = require('./utils');

let sortedSet = new SortedSet({}, undefined, (a, b) => a - b);
let sortedSet1 = new Sorted((a, b) => a - b);
let data = getData();
let entries = Object.entries(data).slice(0, 500000);

console.log('Setting:');
let date = Date.now();
for (const [key, value] of entries) {
    sortedSet.add(value);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key, value] of entries) {
    sortedSet1.add(value);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);

console.log('\nGetting:');
date = Date.now();
for (const [key, value] of entries) {
    sortedSet.has(value);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key, value] of entries) {
    sortedSet1.has(value);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);
