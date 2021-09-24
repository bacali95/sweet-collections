export interface Node<K, V> {
    key: K;
    value: V;
    used?: number;
    previous?: Node<K, V>;
    next?: Node<K, V>;
}

export abstract class SizedMap<K, V> implements Map<K, V> {
    readonly limit: number;
    protected readonly map: Map<K, Node<K, V>>;

    constructor(limit: number) {
        if (limit < 0) {
            throw new Error('Map size limit should positive.');
        }

        this.limit = limit;
        this.map = new Map<K, Node<K, V>>();
    }

    abstract has(key: K): boolean;

    abstract get(key: K, _default?: V): V | undefined;

    abstract set(key: K, value: V): this;

    delete(key: K): boolean {
        return this.map.delete(key);
    }

    keys(): IterableIterator<K> {
        return this.map.keys();
    }

    values(): IterableIterator<V> {
        return [...this.map.values()].map((node) => node.value)[Symbol.iterator]();
    }

    entries(): IterableIterator<[K, V]> {
        return [...this.map.values()]
            .map<[K, V]>((node) => [node.key, node.value])
            [Symbol.iterator]();
    }

    isFull(): boolean {
        return this.size === this.limit;
    }

    clear() {
        this.map.clear();
    }

    readonly [Symbol.toStringTag]: string;

    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries();
    }

    forEach(cb: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        this.map.forEach((item) => cb.call(thisArg, item.value, item.key, this));
    }

    get size(): number {
        return this.map.size;
    }
}
