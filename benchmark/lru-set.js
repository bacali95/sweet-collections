const Lru = require('../dist').LruSet;
const LruSet = require('collections/lru-set');
const { getData } = require('./utils');

let lruSet = new LruSet({}, 10000);
let lruSet2 = new Lru(10000);
let data = getData();
let entries = Object.entries(data);

console.log('Setting:');
let date = Date.now();
for (const [key] of entries) {
    lruSet.add(key);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key] of entries) {
    lruSet2.add(key);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);

console.log('\nGetting:');
date = Date.now();
for (const [key] of entries) {
    lruSet.has(key);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key] of entries) {
    lruSet2.has(key);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);
