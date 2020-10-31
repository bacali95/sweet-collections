import { SortedSet } from '../src';

describe('Sorted Set', () => {
    let set = new SortedSet<number>((a, b) => a - b);

    beforeEach(() => {
        set.clear();
    });

    it('should set key, values and stay sorted', () => {
        set.add(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(set.size).toBe(10);
        expect<number[]>([...set[Symbol.iterator]()]).toStrictEqual([10, 21, 23, 34, 45, 46, 48, 59, 65, 98]);
        expect<number[]>([...set.keys()]).toStrictEqual([10, 21, 23, 34, 45, 46, 48, 59, 65, 98]);
        expect<number[]>([...set.values()]).toStrictEqual([10, 21, 23, 34, 45, 46, 48, 59, 65, 98]);
    });

    it('should has values by keys', () => {
        set.add(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<boolean>(set.has(10)).toBe(true);
        expect<boolean>(set.has(45)).toBe(true);
        expect<boolean>(set.has(65)).toBe(true);
        expect<boolean>(set.has(98)).toBe(true);
        expect<boolean>(set.has(11)).toBe(false);
    });

    it('should delete values by keys', () => {
        set.add(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<boolean>(set.delete(10)).toBe(true);
        expect<boolean>(set.delete(10)).toBe(false);
        expect<boolean>(set.delete(59)).toBe(true);
        expect<boolean>(set.delete(98)).toBe(true);
        expect<boolean>(set.delete(11)).toBe(false);
    });

    it('should return entries', () => {
        set.add(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<[number, number][]>([...set.entries()]).toStrictEqual([
            [10, 10],
            [21, 21],
            [23, 23],
            [34, 34],
            [45, 45],
            [46, 46],
            [48, 48],
            [59, 59],
            [65, 65],
            [98, 98],
        ]);
    });

    it('should run callback in foreach', () => {
        set.add(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        set.forEach((value, key, map) => expect<boolean>(map.has(key)).toBe(true));
    });

    it('should clear', () => {
        set.add(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(set.size).toBe(10);
        set.clear();
        expect<number>(set.size).toBe(0);
        expect<[number, number][]>([...set.entries()]).toStrictEqual([]);
    });
});
