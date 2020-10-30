const Lfu = require('../dist').LfuSet;
const LfuSet = require('collections/lfu-set');
const { getData } = require('./utils');

let lfuSet = new LfuSet({}, 10000);
let lfuSet2 = new Lfu(10000);
let data = getData();
let entries = Object.entries(data);

console.log('Setting:');
let date = Date.now();
for (const [key] of entries) {
    lfuSet.add(key);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key] of entries) {
    lfuSet2.add(key);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);

console.log('\nGetting:');
date = Date.now();
for (const [key] of entries) {
    lfuSet.has(key);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key] of entries) {
    lfuSet2.has(key);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);
