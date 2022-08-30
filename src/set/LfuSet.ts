import { LfuMap } from '../map';

export class LfuSet<T> implements Set<T> {
    private readonly map: LfuMap<T, T>;

    constructor(limit: number) {
        this.map = new LfuMap<T, T>(limit);
    }

    has(value: T): boolean {
        return this.map.has(value);
    }

    add(value: T): this {
        this.map.set(value, value);
        return this;
    }

    delete(value: T): boolean {
        return this.map.delete(value);
    }

    keys(): IterableIterator<T> {
        return this.map.keys();
    }

    values(): IterableIterator<T> {
        return this.map.values();
    }

    entries(): IterableIterator<[T, T]> {
        return this.map.entries();
    }

    clear(): void {
        this.map.clear();
    }

    [Symbol.toStringTag]: string = 'LfuSet';

    [Symbol.iterator](): IterableIterator<T> {
        return this.values();
    }

    forEach(cb: (value: T, key: T, set: Set<T>) => void, thisArg?: any): void {
        this.map.forEach((item) => cb.call(thisArg, item, item, this));
    }

    get size(): number {
        return this.map.size;
    }
}
