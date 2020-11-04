const SweetLruMap = require('../dist').LruMap;
const LruMapJs = require('collections/lru-map');

module.exports = (entries) => {
    console.log('---------------------- LruMap ----------------------');
    const lruMapJs = new LruMapJs({}, 10000);
    const sweetLruMap = new SweetLruMap(10000);

    console.log('Setting:');
    let date = Date.now();
    for (const [key, value] of entries) {
        lruMapJs.set(key, value);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const [key, value] of entries) {
        sweetLruMap.set(key, value);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);

    console.log('\nGetting:');
    date = Date.now();
    for (const [key] of entries) {
        lruMapJs.get(key);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const [key] of entries) {
        sweetLruMap.get(key);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);
};
