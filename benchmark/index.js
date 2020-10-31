const { getData } = require('./utils');

const heap = require('./heap');

const sortedArray = require('./sorted-array');
const sortedSet = require('./sorted-set');
const sortedMap = require('./sorted-map');

const lruSet = require('./lru-set');
const lruMap = require('./lru-map');

const lfuSet = require('./lfu-set');
const lfuMap = require('./lfu-map');

const data = getData();
const entries = Object.entries(data).map(([i, f]) => [parseInt(i), parseFloat(f)]);
const keys = entries.map(e => e[0]);
const values = entries.map(e => e[1]);

heap(values);

sortedArray(values);
sortedSet(values);
sortedMap(entries);

lruSet(keys);
lruMap(entries);

lfuSet(keys);
lfuMap(entries);
