const SweetLruSet = require('../dist').LruSet;
const LruSetJs = require('collections/lru-set');

module.exports = (keys) => {
    console.log('---------------------- LruSet ----------------------');
    const lruSetJs = new LruSetJs({}, 10000);
    const sweetLruSet = new SweetLruSet(10000);

    console.log('Setting:');
    let date = Date.now();
    for (const key of keys) {
        lruSetJs.add(key);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const key of keys) {
        sweetLruSet.add(key);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);

    console.log('\nTest Having:');
    date = Date.now();
    for (const key of keys) {
        lruSetJs.has(key);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const key of keys) {
        sweetLruSet.has(key);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);
};
