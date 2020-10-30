import { LruSet } from '../src';

describe('Lru Set', () => {
    let set = new LruSet<number>(5);

    beforeEach(() => {
        set.clear();
    });

    it('should set key, values and stay sorted', () => {
        for (const value of [45, 46, 48, 98, 23, 34, 65, 59, 21, 10]) {
            set.add(value);
        }
        expect<number>(set.size).toBe(5);
        expect<number[]>([...set[Symbol.iterator]()]).toStrictEqual([34, 65, 59, 21, 10]);
        expect<number[]>([...set.keys()]).toStrictEqual([34, 65, 59, 21, 10]);
        expect<number[]>([...set.values()]).toStrictEqual([34, 65, 59, 21, 10]);
    });

    it('should has values by keys', () => {
        for (const value of [45, 46, 48, 98, 23, 34, 65, 59, 21, 10]) {
            set.add(value);
        }
        expect<boolean>(set.has(10)).toBe(true);
        expect<boolean>(set.has(45)).toBe(false);
        expect<boolean>(set.has(65)).toBe(true);
        expect<boolean>(set.has(98)).toBe(false);
        expect<boolean>(set.has(11)).toBe(false);
    });

    it('should delete values by keys', () => {
        for (const value of [45, 46, 48, 98, 23, 34, 65, 59, 21, 10]) {
            set.add(value);
        }
        expect<boolean>(set.delete(10)).toBe(true);
        expect<boolean>(set.delete(10)).toBe(false);
        expect<boolean>(set.delete(59)).toBe(true);
        expect<boolean>(set.delete(98)).toBe(false);
        expect<boolean>(set.delete(11)).toBe(false);
    });

    it('should return entries', () => {
        for (const value of [45, 46, 48, 98, 23, 34, 65, 59, 21, 10]) {
            set.add(value);
        }
        expect<[number, number][]>([...set.entries()]).toStrictEqual([
            [34, 34],
            [65, 65],
            [59, 59],
            [21, 21],
            [10, 10],
        ]);
    });

    it('should run callback in foreach', () => {
        for (const value of [45, 46, 48, 98, 23, 34, 65, 59, 21, 10]) {
            set.add(value);
        }
        set.forEach((value, key, map) => expect<boolean>(map.has(key)).toBe(true));
    });

    it('should clear', () => {
        for (const value of [45, 46, 48, 98, 23, 34, 65, 59, 21, 10]) {
            set.add(value);
        }
        expect<number>(set.size).toBe(5);
        set.clear();
        expect<number>(set.size).toBe(0);
        expect<[number, number][]>([...set.entries()]).toStrictEqual([]);
    });
});
