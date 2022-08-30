import { SortedArray as SweetSortedArray } from '..';
import { add, complete, cycle, save, suite } from 'benny';
import * as SortedArrayJs from 'collections/sorted-array';

export function sortedArray() {
    const sortedArrayJs = new SortedArrayJs({}, undefined, (a, b) => a - b);
    const sweetSortedArray = new SweetSortedArray<number>((a, b) => a - b);

    suite(
        'SortedArray',
        add('CollectionsJS', () => sortedArrayJs.push(Math.random())),
        add('SweetCollections', () => sweetSortedArray.push(Math.random())),
        cycle(),
        complete(),
        save({ file: 'SortedArray', format: 'table.html' }),
    );
}
