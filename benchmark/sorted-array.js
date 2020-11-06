const { red, blueBright, yellow, green, magenta } = require('chalk');
const SweetSortedArray = require('../dist').SortedArray;
const SortedArrayJs = require('collections/sorted-array');

module.exports = (values) => {
    console.log(red('---------------------- SortedArray ----------------------'));
    const sortedArrayJs = new SortedArrayJs({}, undefined, (a, b) => a - b);
    const sweetSortedArray = new SweetSortedArray((a, b) => a - b);

    console.log(blueBright('Adding:'));
    let date = Date.now();
    for (const value of values) {
        sortedArrayJs.push(value);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const value of values) {
        sweetSortedArray.push(value);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);

    console.log(blueBright('\nTest Including:'));
    date = Date.now();
    for (const value of values) {
        sortedArrayJs.findValue(value);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const value of values) {
        sweetSortedArray.includes(value);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);
};
