import { SortedMap as SweetSortedMap } from '..';
import { add, complete, cycle, save, suite } from 'benny';
import * as SortedMapJs from 'collections/sorted-map';

export function sortedMap() {
    const sortedMapJs = new SortedMapJs({}, undefined, (a, b) => a - b);
    const sweetSortedMap = new SweetSortedMap<number, number>((a, b) => a - b);

    suite(
        'SortedMap',
        add('CollectionsJS', () => sortedMapJs.set(Math.random(), Math.random())),
        add('SweetCollections', () => sweetSortedMap.set(Math.random(), Math.random())),
        cycle(),
        complete(),
        save({ file: 'SortedMap', format: 'table.html' }),
    );
}
