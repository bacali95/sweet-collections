const { red, blueBright, yellow, green, magenta } = require('chalk');
const SweetSortedMap = require('../dist').SortedMap;
const SortedMapJs = require('collections/sorted-map');

module.exports = (entries) => {
    console.log(red('---------------------- SortedMap ----------------------'));
    const sortedMap = new SortedMapJs({}, undefined, (a, b) => a - b);
    const sweetSortedMap = new SweetSortedMap((a, b) => a - b);

    console.log(blueBright('Setting:'));
    let date = Date.now();
    for (const [key, value] of entries) {
        sortedMap.set(value, key);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const [key, value] of entries) {
        sweetSortedMap.set(value, key);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);

    console.log(blueBright('\nGetting:'));
    date = Date.now();
    for (const [, value] of entries) {
        sortedMap.get(value);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const [, value] of entries) {
        sweetSortedMap.get(value);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);
};
