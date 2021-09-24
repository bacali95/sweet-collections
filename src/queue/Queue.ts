interface Node<T> {
    value: T;
    next?: Node<T>;
}

export class Queue<T> {
    private head?: Node<T>;
    private tail?: Node<T>;
    private _size: number = 0;

    push(...values: T[]): this {
        for (const value of values) {
            const node: Node<T> = { value };

            if (this.tail) {
                this.tail.next = node;
            }
            this.tail = node;

            if (!this.head) {
                this.head = this.tail;
            }
            this._size++;
        }

        return this;
    }

    pop(_default?: T): T | undefined {
        if (this.head) {
            const value = this.head.value;
            this.head = this.head.next;
            if (!this.head) {
                this.tail = undefined;
            }
            this._size--;
            return value;
        }
        return _default;
    }

    peek(): T | undefined {
        return this.head.value;
    }

    isEmpty(): boolean {
        return this.head === undefined;
    }

    clear(): void {
        this.head = this.tail = undefined;
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }
}
