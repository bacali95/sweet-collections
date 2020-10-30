interface Node<T> {
    data: T;
    height: number;
    count: number;
    nbrOfChildren: number;
    left?: Node<T>;
    right?: Node<T>;
}

export class SortedArray<T> {
    private root: Node<T>;
    private readonly comparator: (a: T, b: T) => number;
    private readonly unique: boolean;

    constructor(comparator: (a: T, b: T) => number, unique: boolean = false) {
        this.comparator = comparator;
        this.unique = unique;
        this.root = undefined;
    }

    push(data: T): number {
        this.root = this._insert(data, this.root);
        return this.length;
    }

    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) return undefined;
        let node = this.root;
        index++;
        while (true) {
            if (node.left) {
                if (index <= this._size(node.left)) {
                    node = node.left;
                    continue;
                }
                index -= this._size(node.left);
            }
            if (index > 0 && index <= node.count) break;
            index -= node.count;
            node = node.right;
        }
        return node.data;
    }

    clear(): void {
        this.root = undefined;
    }

    firstIndexOf(data: T): number {
        return this.findIndex(data);
    }

    lastIndexOf(data: T): number {
        return this.findIndex(data, true);
    }

    count(data: T): number {
        return this.find(data)?.count ?? 0;
    }

    includes(data: T): boolean {
        return this.count(data) > 0;
    }

    delete(value: T): boolean {
        const oldLength = this.length;
        this.root = this._delete(value, this.root);
        return oldLength !== this.length;
    }

    toArray(): T[] {
        return this._toArray(this.root);
    }

    shift(): T | undefined {
        const min = this.min();
        if (!min) return undefined;
        this.delete(min);
        return min;
    }

    pop(): T | undefined {
        const max = this.max();
        if (!max) return undefined;
        this.delete(max);
        return max;
    }

    min(): T | undefined {
        return this._min(this.root);
    }

    max(): T | undefined {
        return this._max(this.root);
    }

    get length(): number {
        return this._size(this.root);
    }

    private _min(node?: Node<T>): T | undefined {
        if (!node) return undefined;
        let min = node.data;
        while (node.left) {
            min = node.left.data;
            node = node.left;
        }
        return min;
    }

    private _max(node?: Node<T>): T | undefined {
        if (!node) return undefined;
        let max = node.data;
        while (node.right) {
            max = node.right.data;
            node = node.right;
        }
        return max;
    }

    private find(data: T): Node<T> | undefined {
        let node = this.root;
        let comp;
        while (node) {
            comp = this.comparator(data, node.data);
            if (comp > 0) {
                node = node.right;
            } else if (comp < 0) {
                node = node.left;
            } else {
                return node;
            }
        }
        return undefined;
    }

    private findIndex(data: T, last: boolean = false): number {
        let node = this.root;
        let index = 0;
        let comp;
        while (node) {
            comp = this.comparator(data, node.data);
            if (comp > 0) {
                index += this._size(node.left) + node.count;
                node = node.right;
            } else if (comp < 0) {
                node = node.left;
            } else {
                return index + this._size(node.left) + (last ? node.count - 1 : 0);
            }
        }
        return -1;
    }

    private height(node?: Node<T>): number {
        return node ? node.height : -1;
    }

    private _size(node?: Node<T>): number {
        return node ? node.nbrOfChildren + node.count : 0;
    }

    private _insert(data: T, node?: Node<T>): Node<T> {
        let comp = node ? this.comparator(data, node.data) : -1;
        if (!node) {
            node = { data: data, height: 0, count: 1, nbrOfChildren: 0 };
        } else if (comp < 0) {
            node.left = this._insert(data, node.left);
            if (this.height(node.left) - this.height(node.right) > 1) {
                comp = this.comparator(data, node.left.data);
                if (comp < 0) node = this.rotateWithLeftChild(node);
                else node = this.doubleWithLeftChild(node);
            }
        } else if (comp > 0) {
            node.right = this._insert(data, node.right);
            if (this.height(node.right) - this.height(node.left) > 1) {
                comp = this.comparator(data, node.right.data);
                if (comp > 0) node = this.rotateWithRightChild(node);
                else node = this.doubleWithRightChild(node);
            }
        } else if (!this.unique) {
            node.count++;
        }
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        node.nbrOfChildren = this._size(node.left) + this._size(node.right);
        return node;
    }

    private rotateWithLeftChild(node: Node<T>): Node<T> {
        const aux = node.left;
        node.left = aux.right;
        aux.right = node;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        node.nbrOfChildren = this._size(node.left) + this._size(node.right);
        aux.height = Math.max(this.height(aux.left), node.height) + 1;
        aux.nbrOfChildren = this._size(aux.left) + this._size(aux.right);
        return aux;
    }

    private rotateWithRightChild(node: Node<T>): Node<T> {
        const aux = node.right;
        node.right = aux.left;
        aux.left = node;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        node.nbrOfChildren = this._size(node.left) + this._size(node.right);
        aux.height = Math.max(this.height(aux.left), node.height) + 1;
        aux.nbrOfChildren = this._size(aux.left) + this._size(aux.right);
        return aux;
    }

    private doubleWithLeftChild(node: Node<T>): Node<T> {
        node.left = this.rotateWithRightChild(node.left);
        return this.rotateWithLeftChild(node);
    }

    private doubleWithRightChild(node: Node<T>): Node<T> {
        node.right = this.rotateWithLeftChild(node.right);
        return this.rotateWithRightChild(node);
    }

    private _delete(value: T, node: Node<T>, removed: boolean = false): Node<T> {
        if (!node) return node;
        let comp = this.comparator(value, node.data);
        if (comp < 0) {
            node.left = this._delete(value, node.left, removed);
        } else if (comp > 0) {
            node.right = this._delete(value, node.right, removed);
        } else {
            if (!removed) node.count--;
            if (!node.count || removed) {
                if (!node.left) {
                    return node.right;
                }
                if (!node.right) {
                    return node.left;
                }
                node.data = this._min(node.right);
                node.count = node.right.count;
                node.right = this._delete(node.right.data, node.right, true);
            }
        }
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        node.nbrOfChildren = this._size(node.left) + this._size(node.right);
        return node;
    }

    private _toArray(node: Node<T>): T[] {
        return node
            ? [...this._toArray(node.left), ...new Array(node.count).fill(node.data), ...this._toArray(node.right)]
            : [];
    }
}
