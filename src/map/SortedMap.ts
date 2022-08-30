import { SortedArray } from '../array';

type KeyValue<K, V> = { key: K; value: V };

export class SortedMap<K, V> implements Map<K, V> {
    private array: SortedArray<KeyValue<K, V>>;
    private readonly comparator: (a: K, b: K) => number;

    constructor(comparator: (a: K, b: K) => number) {
        this.comparator = comparator;
        this.array = new SortedArray((a, b) => comparator(a.key, b.key), true);
    }

    has(key: K): boolean {
        return this.array.includes({ key } as KeyValue<K, V>);
    }

    get(key: K, _default?: V): V | undefined {
        const index = this.array.firstIndexOf({ key } as KeyValue<K, V>);
        return this.array.get(index)?.value ?? _default;
    }

    set(key: K, value: V): this {
        this.array.push({ key, value });
        return this;
    }

    delete(key: K): boolean {
        return this.array.delete({ key } as KeyValue<K, V>);
    }

    keys(): IterableIterator<K> {
        return this.array
            .toArray()
            .map((n) => n.key)
            [Symbol.iterator]();
    }

    values(): IterableIterator<V> {
        return this.array
            .toArray()
            .map((n) => n.value)
            [Symbol.iterator]();
    }

    entries(): IterableIterator<[K, V]> {
        return this.array
            .toArray()
            .map<[K, V]>((n) => [n.key, n.value])
            [Symbol.iterator]();
    }

    clear() {
        this.array.clear();
    }

    [Symbol.toStringTag]: string = 'SortedMap';

    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries();
    }

    forEach(cb: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        this.array.toArray().forEach((item) => cb.call(thisArg, item.value, item.key, this));
    }

    get size(): number {
        return this.array.length;
    }
}
