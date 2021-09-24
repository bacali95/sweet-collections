const parent = (i: number): number => ((i + 1) >>> 1) - 1;
const left = (i: number): number => (i << 1) + 1;
const right = (i: number): number => (i + 1) << 1;

export class Heap<T> {
    private heap: T[];
    private readonly comparator: (a: T, b: T) => boolean;

    constructor(comparator: (a: T, b: T) => boolean) {
        this.comparator = comparator;
        this.heap = [];
    }

    push(...values: T[]): this {
        for (const item of values) {
            this.heap.push(item);
            this.siftUp();
        }
        return this;
    }

    peek(): T {
        return this.heap[0];
    }

    pop(): T {
        const poppedValue = this.peek();
        const bottom = this.size - 1;
        if (bottom > 0) {
            this.swap(0, bottom);
        }
        this.heap.pop();
        this.siftDown();
        return poppedValue;
    }

    replace(value: T): T {
        const replacedValue = this.peek();
        this.heap[0] = value;
        this.siftDown();
        return replacedValue;
    }

    clear(): void {
        this.heap = [];
    }

    toArray(): T[] {
        return this.heap;
    }

    get size(): number {
        return this.heap.length;
    }

    private greater(i: number, j: number): boolean {
        return this.comparator(this.heap[i], this.heap[j]);
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private siftUp(): void {
        let node = this.size - 1;
        while (node > 0 && this.greater(node, parent(node))) {
            this.swap(node, parent(node));
            node = parent(node);
        }
    }

    private siftDown(): void {
        let node = 0;
        while (
            (left(node) < this.size && this.greater(left(node), node)) ||
            (right(node) < this.size && this.greater(right(node), node))
        ) {
            const maxChild =
                right(node) < this.size && this.greater(right(node), left(node)) ? right(node) : left(node);
            this.swap(node, maxChild);
            node = maxChild;
        }
    }
}
