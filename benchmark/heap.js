const { red, blueBright, yellow, green, magenta } = require('chalk');
const SweetHeap = require('../dist').Heap;
const HeapJs = require('collections/heap');

module.exports = (values) => {
    console.log(red('---------------------- Heap ----------------------'));
    const heapJs = new HeapJs({}, undefined, (a, b) => b - a);
    const sweetHeap = new SweetHeap((a, b) => a < b);

    console.log(blueBright('Adding:'));
    let date = Date.now();
    for (const value of values) {
        heapJs.push(value);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const value of values) {
        sweetHeap.push(value);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);

    console.log(blueBright('\nPopping:'));
    date = Date.now();
    for (let i = 0; i < values.length; i++) {
        heapJs.pop();
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (let i = 0; i < values.length; i++) {
        sweetHeap.pop();
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);
};
