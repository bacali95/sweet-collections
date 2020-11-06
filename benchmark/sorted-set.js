const { red, blueBright, yellow, green, magenta } = require('chalk');
const SweetSortedSet = require('../dist').SortedSet;
const SortedSetJs = require('collections/sorted-set');

module.exports = (values) => {
    console.log(red('---------------------- SortedSet ----------------------'));
    const sortedSetJs = new SortedSetJs({}, undefined, (a, b) => a - b);
    const sweetSortedSet = new SweetSortedSet((a, b) => a - b);

    console.log(blueBright('Adding:'));
    let date = Date.now();
    for (const value of values) {
        sortedSetJs.add(value);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const value of values) {
        sweetSortedSet.add(value);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);

    console.log(blueBright('\nTest Having:'));
    date = Date.now();
    for (const value of values) {
        sortedSetJs.has(value);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const value of values) {
        sweetSortedSet.has(value);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);
};
