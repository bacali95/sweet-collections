const { red, blueBright, yellow, green, magenta } = require('chalk');
const SweetLfuMap = require('../dist').LfuMap;
const LfuMapJs = require('collections/lfu-map');

module.exports = (entries) => {
    console.log(red('---------------------- LfuMap ----------------------'));
    const lruMapJs = new LfuMapJs({}, 10000);
    const sweetLfuMap = new SweetLfuMap(10000);

    console.log(blueBright('Setting:'));
    let date = Date.now();
    for (const [key, value] of entries) {
        lruMapJs.set(key, value);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const [key, value] of entries) {
        sweetLfuMap.set(key, value);
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
        sweetLfuMap.get(key);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);
};
