import { Heap } from '../heap';

export interface Node<K, V> {
    key: K;
    value: V;
    index: number;
    freq?: number;
    previousIndex?: number;
    nextIndex?: number;
}

export abstract class SizedMap<K, V> implements Map<K, V> {
    readonly limit: number;
    protected readonly keysMap: Map<K, number>;
    protected readonly valuesList: (Node<K, V> | undefined)[];
    protected readonly freeIndexes: Heap<number>;
    protected headIndex?: number;
    protected tailIndex?: number;
    protected maxIndex: number;

    constructor(limit: number) {
        if (limit <= 0) {
            throw new Error('Map size limit should be strictly positive.');
        }

        this.limit = limit;
        this.keysMap = new Map<K, number>();
        this.valuesList = new Array(limit).fill(undefined);
        this.freeIndexes = new Heap<number>(() => false);
        this.maxIndex = 0;
    }

    abstract has(key: K): boolean;

    abstract get(key: K, _default?: V): V | undefined;

    abstract set(key: K, value: V): this;

    delete(key: K): boolean {
        const index = this.keysMap.get(key);
        if (index !== undefined) {
            this.removeNode(this.valuesList[index]!);
            this.valuesList[index] = undefined;
            this.freeIndexes.push(index);
        }
        return this.keysMap.delete(key);
    }

    *keys(): IterableIterator<K> {
        let index = this.headIndex;
        while (index !== undefined) {
            const node = this.valuesList[index]!;

            yield node.key;

            index = node.nextIndex;
        }
    }

    *values(): IterableIterator<V> {
        let index = this.headIndex;
        while (index !== undefined) {
            const node = this.valuesList[index]!;

            yield node.value;

            index = node.nextIndex;
        }
    }

    *entries(): IterableIterator<[K, V]> {
        let index = this.headIndex;
        while (index !== undefined) {
            const node = this.valuesList[index]!;

            yield [node.key, node.value];

            index = node.nextIndex;
        }
    }

    isFull(): boolean {
        return this.size === this.limit;
    }

    clear() {
        this.keysMap.clear();
        this.valuesList.fill(undefined);
        this.freeIndexes.clear();
        this.headIndex = this.tailIndex = undefined;
        this.maxIndex = 0;
    }

    [Symbol.toStringTag]: string = 'SizedMap';

    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries();
    }

    forEach(cb: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        const entries = [...this.entries()];
        for (const [key, value] of entries) {
            cb.call(thisArg, value, key, this);
        }
    }

    get size(): number {
        return this.keysMap.size;
    }

    protected getNewIndex(): number {
        if (this.size === 0) {
            return this.headIndex ?? this.maxIndex++;
        }

        if (this.isFull()) {
            this.delete(this.valuesList[this.tailIndex!]!.key);
        }

        if (this.freeIndexes.size > 0) {
            return this.freeIndexes.pop();
        }

        return this.maxIndex++;
    }

    protected removeNode(node: Node<K, V>): void {
        if (node.previousIndex !== undefined) {
            this.valuesList[node.previousIndex]!.nextIndex = node.nextIndex;
        } else {
            this.headIndex = node.nextIndex;
        }

        if (node.nextIndex !== undefined) {
            this.valuesList[node.nextIndex]!.previousIndex = node.previousIndex;
        } else {
            this.tailIndex = node.previousIndex;
        }
        node.nextIndex = node.previousIndex = undefined;
    }
}
