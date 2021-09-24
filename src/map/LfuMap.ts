import { Node, SizedMap } from './SizedMap';

type Frequency = {
    index: number;
    count: number;
    previous?: Frequency;
    next?: Frequency;
};

export class LfuMap<K, V> extends SizedMap<K, V> {
    private queue: { [used: string]: { head?: Node<K, V>; tail?: Node<K, V> } } = {};
    private frequencies: { [used: string]: Frequency } = { 1: { index: 1, count: 0 } };
    private leastFrequent: Frequency = this.frequencies[1];

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
        if (!this.limit) return this;
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
        const node = this.queue[min].tail;
        this.removeNode(node);
        return node;
    }

    private moveToTop(node: Node<K, V>): void {
        const used = ++node.used;
        this.increaseFrequency(used);
        this.initQueue(used);
        node.next = this.queue[used].head;
        node.previous = undefined;
        if (this.queue[used].head) {
            this.queue[used].head.previous = node;
        }
        this.queue[used].head = node;
        if (!this.queue[used].tail) {
            this.queue[used].tail = this.queue[used].head;
        }
    }

    private removeNode(node: Node<K, V>): void {
        const used = node.used;
        this.decreaseFrequency(used);
        this.initQueue(used);
        if (node.previous) {
            node.previous.next = node.next;
        } else {
            this.queue[used].head = node.next;
        }
        if (node.next) {
            node.next.previous = node.previous;
        } else {
            this.queue[used].tail = node.previous;
        }
    }

    private increaseFrequency(index: number): void {
        if (!this.frequencies[index]) {
            this.frequencies[index] = { index: index, count: 0 };
            this.frequencies[index].next = this.frequencies[index - 1].next;
            this.frequencies[index].previous = this.frequencies[index - 1].count
                ? this.frequencies[index - 1]
                : this.frequencies[index - 1].previous;
        }
        if (!this.frequencies[index].count) {
            if (this.frequencies[index].previous) {
                this.frequencies[index].next = this.frequencies[index].previous.next;
                this.frequencies[index].previous.next = this.frequencies[index];
            }
            if (this.frequencies[index].next) {
                this.frequencies[index].previous = this.frequencies[index].next.previous;
                this.frequencies[index].next.previous = this.frequencies[index];
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
            if (this.frequencies[index].previous) {
                this.frequencies[index].previous.next = this.frequencies[index].next;
            }
            if (this.frequencies[index].next) {
                this.frequencies[index].next.previous = this.frequencies[index].previous;
            }
        }
        if (!this.leastFrequent || !this.leastFrequent.count) {
            this.leastFrequent = this.leastFrequent.next;
        }
    }
}
