import { SortedSet as SweetSortedSet } from '..';
import { add, complete, cycle, save, suite } from 'benny';
import * as SortedSetJs from 'collections/sorted-set';

export function sortedSet() {
    const sortedSetJs = new SortedSetJs({}, undefined, (a, b) => a - b);
    const sweetSortedSet = new SweetSortedSet<number>((a, b) => a - b);

    suite(
        'SortedSet',
        add('CollectionsJS', () => sortedSetJs.add(Math.random())),
        add('SweetCollections', () => sweetSortedSet.add(Math.random())),
        cycle(),
        complete(),
        save({ file: 'SortedSet', format: 'table.html' }),
    );
}
