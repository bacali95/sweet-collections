const { red, blueBright, yellow, green, magenta } = require('chalk');
const SweetLruSet = require('../dist').LruSet;
const LruSetJs = require('collections/lru-set');

module.exports = (keys) => {
    console.log(red('---------------------- LruSet ----------------------'));
    const lruSetJs = new LruSetJs({}, 10000);
    const sweetLruSet = new SweetLruSet(10000);

    console.log(blueBright('Setting:'));
    let date = Date.now();
    for (const key of keys) {
        lruSetJs.add(key);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const key of keys) {
        sweetLruSet.add(key);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);

    console.log(blueBright('\nTest Having:'));
    date = Date.now();
    for (const key of keys) {
        lruSetJs.has(key);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const key of keys) {
        sweetLruSet.has(key);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);
};
