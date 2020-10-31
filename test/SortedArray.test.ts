import { SortedArray } from '../src';

describe('Sorted Array', () => {
    let array = new SortedArray<number>((a, b) => a - b);

    beforeEach(() => {
        array.clear();
    });

    it('should push items and stay sorted', () => {
        array.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(array.length).toBe(10);
        expect<number[]>(array.toArray()).toStrictEqual([10, 21, 23, 34, 45, 46, 48, 59, 65, 98]);
    });

    it('should get items by index', () => {
        array.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(array.get(0)).toBe(10);
        expect<number>(array.get(3)).toBe(34);
        expect<number>(array.get(6)).toBe(48);
        expect<number>(array.get(9)).toBe(98);
        expect<number>(array.get(10)).toBeUndefined();;
    });

    it('should return the min and the max', () => {
        array.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(array.min()).toBe(10);
        expect<number>(array.max()).toBe(98);
    });

    it('should pop and shift', () => {
        expect<number>(array.shift()).toBeUndefined();;
        expect<number>(array.pop()).toBeUndefined();;
        array.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(array.shift()).toBe(10);
        expect<number>(array.pop()).toBe(98);
        expect<number[]>(array.toArray()).toStrictEqual([21, 23, 34, 45, 46, 48, 59, 65]);
    });

    it('should keep duplicates', () => {
        array.push(45, 46, 23, 48, 98, 23, 34, 65, 46, 59, 21, 10);
        expect<number[]>(array.toArray()).toStrictEqual([10, 21, 23, 23, 34, 45, 46, 46, 48, 59, 65, 98]);
    });

    it('should delete items', () => {
        array.push(45, 46, 48, 98, 23, 34, 34, 65, 47, 21, 10);
        expect<boolean>(array.delete(34)).toBe(true);
        expect<boolean>(array.delete(34)).toBe(true);
        expect<boolean>(array.delete(34)).toBe(false);
        expect<boolean>(array.delete(48)).toBe(true);
        expect<boolean>(array.delete(47)).toBe(true);
        expect<boolean>(array.delete(10)).toBe(true);
        expect<number[]>(array.toArray()).toStrictEqual([21, 23, 45, 46, 65, 98]);
    });

    it('should return includes item', () => {
        array.push(45, 46, 48, 98, 23, 34, 65, 47, 21, 10);
        expect<boolean>(array.includes(45)).toBe(true);
        expect<boolean>(array.includes(11)).toBe(false);
    });

    it('should return first and last index of item', () => {
        array.push(45, 46, 46, 48, 98, 23, 34, 65, 46, 59, 21, 10);
        expect<number>(array.firstIndexOf(46)).toBe(5);
        expect<number>(array.lastIndexOf(46)).toBe(7);
        expect<number>(array.firstIndexOf(11)).toBe(-1);
        expect<number>(array.lastIndexOf(11)).toBe(-1);
    });

    it('should count the number of item', () => {
        array.push(45, 46, 46, 48, 98, 23, 34, 65, 46, 59, 21, 10);
        expect<number>(array.count(98)).toBe(1);
        expect<number>(array.count(46)).toBe(3);
        expect<number>(array.count(11)).toBe(0);
    });

    it('should ignore duplicates', () => {
        array = new SortedArray<number>((a, b) => a - b, true);
        array.push(45, 46, 46, 48, 98, 23, 34, 65, 46, 59, 21, 10);
        expect<number>(array.length).toBe(10);
        expect<number[]>(array.toArray()).toStrictEqual([10, 21, 23, 34, 45, 46, 48, 59, 65, 98]);
    });

    it('should clear', () => {
        array = new SortedArray<number>((a, b) => a - b);
        array.push(45, 46, 48, 98, 23, 34, 65, 59, 21, 10);
        expect<number>(array.length).toBe(10);
        array.clear();
        expect<number>(array.length).toBe(0);
        expect<number[]>([...array.toArray()]).toStrictEqual([]);
    });
});
