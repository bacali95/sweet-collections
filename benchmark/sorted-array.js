const SweetSortedArray = require('../dist').SortedArray;
const SortedArrayJs = require('collections/sorted-array');

module.exports = (values) => {
    console.log('---------------------- SortedArray ----------------------');
    let sortedArrayJs = new SortedArrayJs({}, undefined, (a, b) => a - b);
    let sweetSortedArray = new SweetSortedArray((a, b) => a - b);

    console.log('Adding:');
    let date = Date.now();
    for (const value of values) {
        sortedArrayJs.push(value);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const value of values) {
        sweetSortedArray.push(value);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);

    console.log('\nTest Including:');
    date = Date.now();
    for (const value of values) {
        sortedArrayJs.findValue(value);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const value of values) {
        sweetSortedArray.includes(value);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);
}
