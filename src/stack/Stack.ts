interface Node<T> {
    value: T;
    next?: Node<T>;
}

export class Stack<T> {
    private head?: Node<T>;
    private _size: number = 0;

    push(...values: T[]): this {
        for (const value of values) {
            this.head = { value, next: this.head };
            this._size++;
        }
        return this;
    }

    pop(_default?: T): T | undefined {
        if (this.head) {
            const value = this.head.value;
            this.head = this.head.next;
            this._size--;
            return value;
        }
        return _default;
    }

    top(): T | undefined {
        return this.head?.value;
    }

    isEmpty(): boolean {
        return this.head === undefined;
    }

    clear(): void {
        this.head = undefined;
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }
}
