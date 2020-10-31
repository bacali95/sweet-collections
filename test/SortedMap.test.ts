import { SortedMap } from '../src';

describe('Sorted Map', () => {
    let map = new SortedMap<number, number>((a, b) => a - b);

    beforeEach(() => {
        map.clear();
    });

    it('should set key, values and stay sorted', () => {
        for (const [key, value] of [
            [45, 450],
            [46, 460],
            [48, 480],
            [98, 980],
            [23, 230],
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
        ]) {
            map.set(key, value);
        }
        expect<number>(map.size).toBe(10);
        expect<[number, number][]>([...map[Symbol.iterator]()]).toStrictEqual([
            [10, 100],
            [21, 210],
            [23, 230],
            [34, 340],
            [45, 450],
            [46, 460],
            [48, 480],
            [59, 590],
            [65, 650],
            [98, 980],
        ]);
        expect<number[]>([...map.keys()]).toStrictEqual([10, 21, 23, 34, 45, 46, 48, 59, 65, 98]);
        expect<number[]>([...map.values()]).toStrictEqual([100, 210, 230, 340, 450, 460, 480, 590, 650, 980]);
    });

    it('should get values by keys', () => {
        for (const [key, value] of [
            [45, 450],
            [46, 460],
            [48, 480],
            [98, 980],
            [23, 230],
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
        ]) {
            map.set(key, value);
        }
        expect<number>(map.get(10)).toBe(100);
        expect<number>(map.get(45)).toBe(450);
        expect<number>(map.get(65)).toBe(650);
        expect<number>(map.get(98)).toBe(980);
        expect<number>(map.get(11)).toBeUndefined();
    });

    it('should has values by keys', () => {
        for (const [key, value] of [
            [45, 450],
            [46, 460],
            [48, 480],
            [98, 980],
            [23, 230],
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
        ]) {
            map.set(key, value);
        }
        expect<boolean>(map.has(10)).toBe(true);
        expect<boolean>(map.has(45)).toBe(true);
        expect<boolean>(map.has(65)).toBe(true);
        expect<boolean>(map.has(98)).toBe(true);
        expect<boolean>(map.has(11)).toBe(false);
    });

    it('should delete values by keys', () => {
        for (const [key, value] of [
            [45, 450],
            [46, 460],
            [48, 480],
            [98, 980],
            [23, 230],
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
        ]) {
            map.set(key, value);
        }
        expect<boolean>(map.delete(10)).toBe(true);
        expect<boolean>(map.delete(10)).toBe(false);
        expect<boolean>(map.delete(59)).toBe(true);
        expect<boolean>(map.delete(98)).toBe(true);
    });

    it('should return entries', () => {
        for (const [key, value] of [
            [45, 450],
            [46, 460],
            [48, 480],
            [98, 980],
            [23, 230],
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
        ]) {
            map.set(key, value);
        }
        expect<[number, number][]>([...map.entries()]).toStrictEqual([
            [10, 100],
            [21, 210],
            [23, 230],
            [34, 340],
            [45, 450],
            [46, 460],
            [48, 480],
            [59, 590],
            [65, 650],
            [98, 980],
        ]);
    });

    it('should run callback in foreach', () => {
        for (const [key, value] of [
            [45, 450],
            [46, 460],
            [48, 480],
            [98, 980],
            [23, 230],
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
        ]) {
            map.set(key, value);
        }
        map.forEach((value, key, map) => expect<number>(map.get(key)).toBe(value));
    });

    it('should clear', () => {
        for (const [key, value] of [
            [45, 450],
            [46, 460],
            [48, 480],
            [98, 980],
            [23, 230],
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
        ]) {
            map.set(key, value);
        }
        expect<number>(map.size).toBe(10);
        map.clear();
        expect<number>(map.size).toBe(0);
        expect<[number, number][]>([...map.entries()]).toStrictEqual([]);
    });
});
