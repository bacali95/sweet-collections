const SweetHeap = require('../dist').Heap;
const HeapJs = require('collections/heap');

module.exports = (values) => {
    console.log('---------------------- Heap ----------------------');
    let heapJs = new HeapJs({}, undefined, (a, b) => b - a);
    let sweetHeap = new SweetHeap((a, b) => a < b);

    console.log('Adding:');
    let date = Date.now();
    for (const value of values) {
        heapJs.push(value);
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const value of values) {
        sweetHeap.push(value);
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);

    console.log('\nPopping:');
    date = Date.now();
    for (const value of values) {
        heapJs.pop();
    }
    console.log(`CollectionsJs: ${Date.now() - date}ms`);

    date = Date.now();
    for (const value of values) {
        sweetHeap.pop();
    }
    console.log(`SweetCollections: ${Date.now() - date}ms`);
};
