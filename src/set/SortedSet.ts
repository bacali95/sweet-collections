import { SortedArray } from '../array';

export class SortedSet<T> implements Set<T> {
    private array: SortedArray<T>;

    constructor(comparator: (a: T, b: T) => number) {
        this.array = new SortedArray<T>(comparator, true);
    }

    has(value: T): boolean {
        return this.array.includes(value);
    }

    add(value: T): this {
        this.array.push(value);
        return this;
    }

    delete(value: T): boolean {
        return this.array.delete(value);
    }

    keys(): IterableIterator<T> {
        return this.array.toArray()[Symbol.iterator]();
    }

    values(): IterableIterator<T> {
        return this.array.toArray()[Symbol.iterator]();
    }

    entries(): IterableIterator<[T, T]> {
        return this.array
            .toArray()
            .map<[T, T]>((value) => [value, value])
            [Symbol.iterator]();
    }

    clear(): void {
        this.array.clear();
    }

    readonly [Symbol.toStringTag]: string;

    [Symbol.iterator](): IterableIterator<T> {
        return this.values();
    }

    forEach(cb: (value: T, key: T, set: Set<T>) => void, thisArg?: any): void {
        this.array.toArray().forEach((item) => cb.call(thisArg, item, item, this));
    }

    get size(): number {
        return this.array.length;
    }
}
