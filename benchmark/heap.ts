import { Heap as SweetHeap } from '..';
import { add, complete, cycle, save, suite } from 'benny';
import * as HeapJs from 'collections/heap';

export function heap() {
    const heapJs = new HeapJs({}, undefined, (a, b) => b - a);
    const sweetHeap = new SweetHeap((a, b) => a < b);

    suite(
        'Heap',
        add('CollectionsJS', () => heapJs.push(Math.random())),
        add('SweetCollections', () => sweetHeap.push(Math.random())),
        cycle(),
        complete(),
        save({ file: 'Heap', format: 'table.html' }),
    );
}
