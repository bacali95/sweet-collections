import { LfuSet as SweetLfuSet } from '..';
import { add, complete, cycle, save, suite } from 'benny';
// @ts-ignore
import * as LfuSetJs from 'collections/lfu-set';

export function lfuSet() {
    const lfuSetJs = new LfuSetJs({}, 10000);
    const sweetLfuSet = new SweetLfuSet(10000);

    suite(
        'LfuSet',
        add('CollectionsJS', () => lfuSetJs.add(Math.random())),
        add('SweetCollections', () => sweetLfuSet.add(Math.random())),
        cycle(),
        complete(),
        save({ file: 'LfuSet', format: 'table.html' }),
    );
}
