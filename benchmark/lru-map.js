const Lru = require('../dist').LruMap;
const LruMap = require('collections/lru-map');
const { getData } = require('./utils');

let lruMapJS = new LruMap({}, 10000);
let lruMapTS = new Lru(10000);
let data = getData();
let entries = Object.entries(data);

console.log('Setting:');
let date = Date.now();
for (const [key, value] of entries) {
    lruMapJS.set(key, value);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key, value] of entries) {
    lruMapTS.set(key, value);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);

console.log('\nGetting:');
date = Date.now();
for (const [key] of entries) {
    lruMapJS.get(key);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key] of entries) {
    lruMapTS.get(key);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);
