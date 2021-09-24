import { LruMap } from '../src';

describe('Lru Map', () => {
    const map = new LruMap<number, number>(5);

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
        map.set(10, 100);
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

    it('should work when limit size is two', () => {
        const map = new LruMap<number, number>(2);
        map.set(1, 1);
        map.set(2, 2);
        expect(map.get(1)).toBe(1);
        map.set(3, 3);
        expect(map.get(2)).toBeUndefined();
        map.set(4, 4);
        expect(map.get(1)).toBeUndefined();
        expect(map.get(3)).toBe(3);
        expect(map.get(4)).toBe(4);
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
