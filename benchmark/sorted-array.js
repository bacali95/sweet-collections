const Sorted = require('../dist').SortedArray;
const SortedArray = require('collections/sorted-array');
const { getData } = require('./utils');

let sortedArray = new SortedArray({}, undefined, (a, b) => a - b);
let sortedArray1 = new Sorted((a, b) => a - b);
let data = getData();
let entries = Object.values(data).slice(0, 500000).map(parseFloat);

console.log('Setting:');
let date = Date.now();
for (const value of entries) {
    sortedArray.push(value);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const value of entries) {
    sortedArray1.push(value);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);

console.log('\nGetting:');
date = Date.now();
for (const value of entries) {
    sortedArray.findValue(value);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const value of entries) {
    sortedArray1.includes(value);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);
