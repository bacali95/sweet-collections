import { Node, SizedMap } from './SizedMap';

type Frequency = {
    index: number;
    count: number;
    left?: Frequency;
    right?: Frequency
};

export class LfuMap<K, V> extends SizedMap<K, V> {
    private queue: { [used: string]: { start?: Node<K, V>; end?: Node<K, V> } };
    private leastFrequent: Frequency;
    private frequencies: { [used: string]: Frequency };

    constructor(limit: number) {
        super(limit);
        this.clear();
    }

    has(key: K): boolean {
        const node = this.map.get(key);
        if (node) {
            this.removeNode(node);
            this.moveToTop(node);
            return true;
        }
        return false;
    }

    get(key: K, _default?: V): V | undefined {
        const node = this.map.get(key);
        if (node) {
            this.removeNode(node);
            this.moveToTop(node);
            return node.value;
        }
        return _default;
    }

    set(key: K, value: V): this {
        let node = this.map.get(key);
        if (node) {
            node.value = value;
            this.removeNode(node);
            this.moveToTop(node);
        } else {
            node = {
                key: key,
                value: value,
                used: 0,
            };
            if (this.isFull()) {
                super.delete(this.queuePop().key);
            }
            this.moveToTop(node);
            this.map.set(key, node);
        }
        return this;
    }

    delete(key: K): boolean {
        const node = this.map.get(key);
        if (node) {
            this.removeNode(node);
            return super.delete(key);
        }
        return false;
    }

    clear() {
        this.queue = {};
        this.frequencies = { 1: { index: 1, count: 0 } };
        this.leastFrequent = this.frequencies[1];
        super.clear();
    }

    private initQueue(used: number) {
        if (!this.queue[used]) {
            this.queue[used] = {};
        }
    }

    private queuePop(): Node<K, V> {
        const min = this.leastFrequent.index;
        const node = this.queue[min].end;
        this.removeNode(node);
        return node;
    }

    private moveToTop(node: Node<K, V>): void {
        const used = ++node.used;
        this.increaseFrequency(used);
        this.initQueue(used);
        node.right = this.queue[used].start;
        node.left = undefined;
        if (this.queue[used].start) {
            this.queue[used].start.left = node;
        }
        this.queue[used].start = node;
        if (!this.queue[used].end) {
            this.queue[used].end = this.queue[used].start;
        }
    }

    private removeNode(node: Node<K, V>): void {
        const used = node.used;
        this.decreaseFrequency(used);
        this.initQueue(used);
        if (node.left) {
            node.left.right = node.right;
        } else {
            this.queue[used].start = node.right;
        }
        if (node.right) {
            node.right.left = node.left;
        } else {
            this.queue[used].end = node.left;
        }
    }

    private increaseFrequency(index: number): void {
        if (!this.frequencies[index]) {
            this.frequencies[index] = { index: index, count: 0 };
            this.frequencies[index].right = this.frequencies[index - 1].right;
            this.frequencies[index].left = this.frequencies[index - 1].count
                ? this.frequencies[index - 1]
                : this.frequencies[index - 1].left;
        }
        if (!this.frequencies[index].count) {
            if (this.frequencies[index].left) {
                this.frequencies[index].right = this.frequencies[index].left.right;
                this.frequencies[index].left.right = this.frequencies[index];
            }
            if (this.frequencies[index].right) {
                this.frequencies[index].left = this.frequencies[index].right.left;
                this.frequencies[index].right.left = this.frequencies[index];
            }
        }
        this.frequencies[index].count++;
        if (!this.leastFrequent || index < this.leastFrequent.index) {
            this.leastFrequent = this.frequencies[index];
        }
    }

    private decreaseFrequency(index: number): void {
        this.frequencies[index].count--;
        if (!this.frequencies[index].count) {
            if (this.frequencies[index].left) {
                this.frequencies[index].left.right = this.frequencies[index].right;
            }
            if (this.frequencies[index].right) {
                this.frequencies[index].right.left = this.frequencies[index].left;
            }
        }
        if (!this.leastFrequent || !this.leastFrequent.count) {
            this.leastFrequent = this.leastFrequent.right;
        }
    }
}
