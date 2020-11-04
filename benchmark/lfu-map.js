const SweetLfuMap = require('../dist').LfuMap;
const LfuMapJs = require('collections/lfu-map');

module.exports = (entries) => {
    console.log('---------------------- LfuMap ----------------------');
    const lruMapJs = new LfuMapJs({}, 10000);
    const sweetLfuMap = new SweetLfuMap(10000);

    console.log('Setting:');
    let date = Date.now();
    for (const [key, value] of entries) {
        lruMapJs.set(key, value);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const [key, value] of entries) {
        sweetLfuMap.set(key, value);
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
        sweetLfuMap.get(key);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);
};
