import { Node, SizedMap } from './SizedMap';

export class LruMap<K, V> extends SizedMap<K, V> {
    private start?: Node<K, V>;
    private end?: Node<K, V>;

    constructor(limit: number) {
        super(limit);
    }

    has(key: K): boolean {
        const node = this.map.get(key);
        if (node) {
            this.moveToTop(node);
            return true;
        }
        return false;
    }

    get(key: K, _default?: V): V | undefined {
        const node = this.map.get(key);
        if (node) {
            this.moveToTop(node);
            return node.value;
        }
        return _default;
    }

    set(key: K, value: V): this {
        let node = this.map.get(key);
        if (node) {
            node.value = value;
            this.moveToTop(node);
        } else {
            node = {
                key: key,
                value: value,
            };
            if (this.isFull()) {
                this.delete(this.end.key);
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
        this.start = this.end = undefined;
        super.clear();
    }

    protected moveToTop(node: Node<K, V>): void {
        node.right = this.start;
        node.left = undefined;
        if (this.start) {
            this.start.left = node;
        }
        this.start = node;
        if (!this.end) {
            this.end = this.start;
        }
    }

    protected removeNode(node: Node<K, V>): void {
        if (node.left) {
            node.left.right = node.right;
        } else {
            this.start = node.right;
        }

        if (node.right) {
            node.right.left = node.left;
        } else {
            this.end = node.left;
        }
    }
}
