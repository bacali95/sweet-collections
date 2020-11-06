const { red, blueBright, yellow, green, magenta } = require('chalk');
const SweetLfuSet = require('../dist').LfuSet;
const LfuSetJs = require('collections/lfu-set');

module.exports = (keys) => {
    console.log(red('---------------------- LfuSet ----------------------'));
    const lfuSetJs = new LfuSetJs({}, 10000);
    const sweetLfuSet = new SweetLfuSet(10000);

    console.log(blueBright('Setting:'));
    let date = Date.now();
    for (const key of keys) {
        lfuSetJs.add(key);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const key of keys) {
        sweetLfuSet.add(key);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);

    console.log(blueBright('\nTest Having:'));
    date = Date.now();
    for (const key of keys) {
        lfuSetJs.has(key);
    }
    console.log(`${yellow('CollectionsJs:')} ${green(`${Date.now() - date}ms`)}`);

    date = Date.now();
    for (const key of keys) {
        sweetLfuSet.has(key);
    }
    console.log(`${magenta('SweetCollections:')} ${green(`${Date.now() - date}ms`)}`);
};
