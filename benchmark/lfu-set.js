const SweetLfuSet = require('../dist').LfuSet;
const LfuSetJs = require('collections/lfu-set');

module.exports = (keys) => {
    console.log('---------------------- LfuSet ----------------------');
    const lfuSetJs = new LfuSetJs({}, 10000);
    const sweetLfuSet = new SweetLfuSet(10000);

    console.log('Setting:');
    let date = Date.now();
    for (const key of keys) {
        lfuSetJs.add(key);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const key of keys) {
        sweetLfuSet.add(key);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);

    console.log('\nTest Having:');
    date = Date.now();
    for (const key of keys) {
        lfuSetJs.has(key);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const key of keys) {
        sweetLfuSet.has(key);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);
};
