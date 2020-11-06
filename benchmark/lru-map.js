const { red, blueBright, yellow, green, magenta } = require('chalk');
const SweetLruMap = require('../dist').LruMap;
const LruMapJs = require('collections/lru-map');

module.exports = (entries) => {
    console.log(red('---------------------- LruMap ----------------------'));
    const lruMapJs = new LruMapJs({}, 10000);
    const sweetLruMap = new SweetLruMap(10000);

    console.log(blueBright('Setting:'));
    let date = Date.now();
    for (const [key, value] of entries) {
        lruMapJs.set(key, value);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const [key, value] of entries) {
        sweetLruMap.set(key, value);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);

    console.log(blueBright('\nGetting:'));
    date = Date.now();
    for (const [key] of entries) {
        lruMapJs.get(key);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const [key] of entries) {
        sweetLruMap.get(key);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);
};
