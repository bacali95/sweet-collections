import { Node, SizedMap } from './SizedMap';

export class LruMap<K, V> extends SizedMap<K, V> {
    has(key: K): boolean {
        const index = this.keysMap.get(key);
        if (index !== undefined) {
            const node = this.valuesList[index]!;
            this.removeNode(node);
            this.moveToTop(node);
            return true;
        }
        return false;
    }

    get(key: K, _default?: V): V | undefined {
        const index = this.keysMap.get(key);
        if (index !== undefined) {
            const node = this.valuesList[index]!;
            this.removeNode(node);
            this.moveToTop(node);
            return node.value;
        }
        return _default;
    }

    set(key: K, value: V): this {
        let index = this.keysMap.get(key);
        if (index !== undefined) {
            const node = this.valuesList[index]!;
            node.value = value;
            this.removeNode(node);
            this.moveToTop(node);
        } else {
            index = this.getNewIndex();
            const node: Node<K, V> = { key, value, index };
            this.moveToTop(node);
            this.keysMap.set(key, index);
            this.valuesList[index] = node;
        }
        return this;
    }

    private moveToTop(node: Node<K, V>): void {
        node.nextIndex = this.headIndex;
        node.previousIndex = undefined;
        if (this.headIndex !== undefined) {
            this.valuesList[this.headIndex]!.previousIndex = node.index;
        }
        this.headIndex = node.index;
        if (this.tailIndex === undefined) {
            this.tailIndex = this.headIndex;
        }
    }
}
