import { LruSet as SweetLruSet } from '..';
import { add, complete, cycle, save, suite } from 'benny';
import * as LruSetJs from 'collections/lru-set';

export function lruSet() {
    const lruSetJs = new LruSetJs({}, 10000);
    const sweetLruSet = new SweetLruSet(10000);

    suite(
        'LruSet',
        add('CollectionsJS', () => lruSetJs.add(Math.random())),
        add('SweetCollections', () => sweetLruSet.add(Math.random())),
        cycle(),
        complete(),
        save({ file: 'LruSet', format: 'table.html' }),
    );
}
