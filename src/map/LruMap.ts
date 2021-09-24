import { Node, SizedMap } from './SizedMap';

export class LruMap<K, V> extends SizedMap<K, V> {
    private head?: Node<K, V>;
    private tail?: Node<K, V>;

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
            };
            if (this.isFull()) {
                this.delete(this.tail.key);
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
        this.head = this.tail = undefined;
        super.clear();
    }

    private moveToTop(node: Node<K, V>): void {
        node.next = this.head;
        node.previous = undefined;
        if (this.head) {
            this.head.previous = node;
        }
        this.head = node;
        if (!this.tail) {
            this.tail = this.head;
        }
    }

    private removeNode(node: Node<K, V>): void {
        if (node.previous) {
            node.previous.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.previous = node.previous;
        } else {
            this.tail = node.previous;
        }
    }
}
