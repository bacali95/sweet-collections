import { LruMap as SweetLruMap } from '..';
import { add, complete, cycle, save, suite } from 'benny';
import * as LruMapJs from 'collections/lru-map';
import * as LruCache from 'lru-cache';

export function lruMap() {
    const lruCache = new LruCache({ max: 10000 });
    const lruMapJs = new LruMapJs({}, 10000);
    const sweetLruMap = new SweetLruMap(10000);

    suite(
        'LruMap',
        add('sweet-collections', () => sweetLruMap.set(Math.random(), Math.random())),
        add('lru-cache', () => lruCache.set(Math.random(), Math.random())),
        add('collections', () => lruMapJs.set(Math.random(), Math.random())),
        cycle(),
        complete(),
        save({ file: 'LruMap', format: 'table.html' }),
    );
}
