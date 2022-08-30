import { LfuMap as SweetLfuMap } from '..';
import { add, complete, cycle, save, suite } from 'benny';
// @ts-ignore
import * as LfuMapJs from 'collections/lfu-map';

export function lfuMap() {
    const lfuMapJs = new LfuMapJs({}, 10000);
    const sweetLfuMap = new SweetLfuMap(10000);

    suite(
        'LfuMap',
        add('CollectionsJS', () => lfuMapJs.set(Math.random(), Math.random())),
        add('SweetCollections', () => sweetLfuMap.set(Math.random(), Math.random())),
        cycle(),
        complete(),
        save({ file: 'LfuMap', format: 'table.html' }),
    );
}
