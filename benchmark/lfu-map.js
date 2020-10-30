const Lfu = require('../dist').LfuMap;
const LfuMap = require('collections/lfu-map');
const { getData } = require('./utils');

let lfuMapJS = new LfuMap({}, 10000);
let lfuMapTS = new Lfu(10000);
let data = getData();
let entries = Object.entries(data);

console.log('Setting:');
let date = Date.now();
for (const [key, value] of entries) {
    lfuMapJS.set(key, value);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key, value] of entries) {
    lfuMapTS.set(key, value);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);

console.log('\nGetting:');
date = Date.now();
for (const [key] of entries) {
    lfuMapJS.get(key);
}
console.log(`CollectionsJs: ${Date.now() - date}ms`);

date = Date.now();
for (const [key] of entries) {
    lfuMapTS.get(key);
}
console.log(`CollectionsTs: ${Date.now() - date}ms`);
