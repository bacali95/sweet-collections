import { Heap } from '../src';

describe('Heap', () => {
    let heap = new Heap<number>((a, b) => a < b);

    beforeEach(() => {
        heap.clear();
    });

    it('should push values and get the heap array', () => {
        heap.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(heap.size).toBe(10);
        expect<number[]>([...heap.toArray()]).toStrictEqual([10, 21, 34, 45, 23, 48, 65, 98, 59, 46]);
    });

    it('should return the peek', () => {
        heap.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(heap.peek()).toBe(10);
    });

    it('should pop and return the peek', () => {
        heap.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(heap.pop()).toBe(10);
        expect<number>(heap.pop()).toBe(21);
        expect<number>(heap.size).toBe(8);
        expect<number>(heap.peek()).toBe(23);
    });

    it('should replace the peek', () => {
        heap.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(heap.replace(22)).toBe(10);
        expect<number>(heap.peek()).toBe(21);
    });

    it('should clear', () => {
        heap.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(heap.size).toBe(10);
        heap.clear();
        expect<number>(heap.size).toBe(0);
        expect<number[]>([...heap.toArray()]).toStrictEqual([]);
    });
});
