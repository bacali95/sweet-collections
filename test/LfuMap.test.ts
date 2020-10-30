import { LfuMap } from '../src';

describe('Lfu Map', () => {
    let map = new LfuMap<number, number>(5);

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
        expect<number>(map.size).toBe(5);
        expect<[number, number][]>([...map[Symbol.iterator]()]).toStrictEqual([
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
        ]);
        expect<number[]>([...map.keys()]).toStrictEqual([34, 65, 59, 21, 10]);
        expect<number[]>([...map.values()]).toStrictEqual([340, 650, 590, 210, 100]);
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
        expect<number>(map.get(45)).toBeUndefined();
        expect<number>(map.get(65)).toBe(650);
        expect<number>(map.get(98)).toBeUndefined();
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
        expect<boolean>(map.has(45)).toBe(false);
        expect<boolean>(map.has(65)).toBe(true);
        expect<boolean>(map.has(98)).toBe(false);
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
        expect<boolean>(map.delete(98)).toBe(false);
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
            [34, 340],
            [65, 650],
            [59, 590],
            [21, 210],
            [10, 100],
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
        expect<number>(map.size).toBe(5);
        map.clear();
        expect<number>(map.size).toBe(0);
        expect<[number, number][]>([...map.entries()]).toStrictEqual([]);
    });
});
