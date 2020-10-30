import { Node, SizedMap } from './SizedMap';

export class LfuMap<K, V> extends SizedMap<K, V> {
    private queue: { [used: string]: { start?: Node<K, V>; end?: Node<K, V> } };

    constructor(limit: number) {
        super(limit);
        this.queue = {};
    }

    has(key: K): boolean {
        const node = this.map.get(key);
        if (node) {
            this.removeNode(node);
            node.used++;
            this.moveToTop(node);
            return true;
        }
        return false;
    }

    get(key: K, _default?: V): V | undefined {
        const node = this.map.get(key);
        if (node) {
            this.removeNode(node);
            node.used++;
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
            node.used++;
            this.moveToTop(node);
        } else {
            node = {
                key: key,
                value: value,
                used: 1,
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
        super.clear();
    }

    private initQueue(used: number) {
        if (!this.queue[used]) {
            this.queue[used] = {};
        }
    }

    private queuePop(): Node<K, V> {
        let strings = Object.keys(this.queue);
        const min = strings.map(parseInt).sort().shift();
        const node = this.queue[min].end;
        this.removeNode(node);
        return node;
    }

    private moveToTop(node: Node<K, V>): void {
        const used = node.used;
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
}
