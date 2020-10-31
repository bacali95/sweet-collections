const SweetSortedSet = require('../dist').SortedSet;
const SortedSetJs = require('collections/sorted-set');

module.exports = (values) => {
    console.log('---------------------- SortedSet ----------------------');
    let sortedSetJs = new SortedSetJs({}, undefined, (a, b) => a - b);
    let sweetSortedSet = new SweetSortedSet((a, b) => a - b);

    console.log('Adding:');
    let date = Date.now();
    for (const value of values) {
        sortedSetJs.add(value);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const value of values) {
        sweetSortedSet.add(value);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);

    console.log('\nTest Having:');
    date = Date.now();
    for (const value of values) {
        sortedSetJs.has(value);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const value of values) {
        sweetSortedSet.has(value);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);
};
