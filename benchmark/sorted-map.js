const Sorted = require('../dist').SortedMap;
const SortedMap = require('collections/sorted-map');
const { getData } = require('./utils');

let sortedMap = new SortedMap({}, undefined, (a, b) => a - b);
let sortedMap1 = new Sorted((a, b) => a - b);
let data = getData();
let entries = Object.entries(data).slice(0, 500000);

console.log('Setting:');
let date = Date.now();
for (const [key, value] of entries) {
    sortedMap.set(value, key);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key, value] of entries) {
    sortedMap1.set(value, key);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);

console.log('\nGetting:');
date = Date.now();
for (const [key, value] of entries) {
    sortedMap.get(value);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key, value] of entries) {
    sortedMap1.get(value);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);
