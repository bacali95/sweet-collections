import { Node, SizedMap } from './SizedMap';

type Frequency = {
    freq: number;
    count: number;
    previousFreq?: number;
    nextFreq?: number;
};

export class LfuMap<K, V> extends SizedMap<K, V> {
    private queue: { [freq: string]: { headIndex?: number; tailIndex?: number } } = {};
    private frequencies: { [freq: string]: Frequency } = { 1: { freq: 1, count: 0 } };
    private leastFrequent: number | undefined = 1;

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
            const node: Node<K, V> = { key, value, index, freq: 0 };
            this.keysMap.set(key, index);
            this.valuesList[index] = node;
            this.moveToTop(node);
        }
        return this;
    }

    clear() {
        this.queue = {};
        this.frequencies = { 1: { freq: 1, count: 0 } };
        this.leastFrequent = 1;
        super.clear();
    }

    private initQueue(freq: number) {
        if (!this.queue[freq]) {
            this.queue[freq] = {};
        }
    }

    private moveToTop(node: Node<K, V>): void {
        const freq = ++node.freq!;
        this.increaseFrequency(freq);
        this.initQueue(freq);

        const frequency = this.frequencies[freq];

        if (this.queue[freq].headIndex !== undefined) {
            node.nextIndex = this.queue[freq].headIndex;
            this.valuesList[this.queue[freq].headIndex!]!.previousIndex = node.index;
        } else if (frequency.previousFreq !== undefined) {
            node.nextIndex = this.queue[this.frequencies[frequency.previousFreq].freq].headIndex;
            this.valuesList[this.queue[this.frequencies[frequency.previousFreq].freq].headIndex!]!.previousIndex =
                node.index;
        }

        this.queue[freq].headIndex = node.index;
        if (this.queue[freq].tailIndex === undefined) {
            this.queue[freq].tailIndex = node.index;
        }

        if (frequency.nextFreq !== undefined) {
            node.previousIndex = this.queue[this.frequencies[frequency.nextFreq].freq].tailIndex;
            this.valuesList[this.queue[this.frequencies[frequency.nextFreq].freq].tailIndex!]!.nextIndex = node.index;
        }

        let lastFrequency = frequency;
        while (lastFrequency.nextFreq !== undefined) {
            lastFrequency = this.frequencies[lastFrequency.nextFreq];
        }
        this.headIndex = this.queue[lastFrequency!.freq].headIndex;
        this.tailIndex = this.queue[this.leastFrequent!].tailIndex;
    }

    protected removeNode(node: Node<K, V>): void {
        const freq = node.freq!;
        this.decreaseFrequency(freq);
        this.initQueue(freq);
        if (node.index === this.queue[freq].headIndex) {
            this.queue[freq].headIndex = node.nextIndex;
        }
        if (node.index === this.queue[freq].tailIndex) {
            this.queue[freq].tailIndex = node.previousIndex;
        }
        super.removeNode(node);
    }

    private increaseFrequency(freq: number): void {
        if (!this.frequencies[freq]) {
            this.frequencies[freq] = { freq, count: 0 };
            this.frequencies[freq].nextFreq = this.frequencies[freq - 1].nextFreq;
            this.frequencies[freq].previousFreq = this.frequencies[freq - 1].count
                ? freq - 1
                : this.frequencies[freq - 1].previousFreq;
        }
        if (!this.frequencies[freq].count) {
            if (this.frequencies[freq].previousFreq !== undefined) {
                this.frequencies[freq].nextFreq = this.frequencies[this.frequencies[freq].previousFreq!]!.nextFreq;
                this.frequencies[this.frequencies[freq].previousFreq!]!.nextFreq = freq;
            }
            if (this.frequencies[freq].nextFreq !== undefined) {
                this.frequencies[freq].previousFreq = this.frequencies[this.frequencies[freq].nextFreq!]!.previousFreq;
                this.frequencies[this.frequencies[freq].nextFreq!]!.previousFreq = freq;
            }
        }
        this.frequencies[freq].count++;
        if (!this.leastFrequent || freq < this.leastFrequent) {
            this.leastFrequent = freq;
        }
    }

    private decreaseFrequency(freq: number): void {
        this.frequencies[freq].count--;
        if (!this.frequencies[freq].count) {
            if (this.frequencies[freq].previousFreq !== undefined) {
                this.frequencies[this.frequencies[freq].previousFreq!]!.nextFreq = this.frequencies[freq].nextFreq;
            }
            if (this.frequencies[freq].nextFreq !== undefined) {
                this.frequencies[this.frequencies[freq].nextFreq!]!.previousFreq = this.frequencies[freq].previousFreq;
            }
        }
        if (!this.leastFrequent || !this.frequencies[this.leastFrequent!].count) {
            this.leastFrequent = this.frequencies[this.leastFrequent!]?.nextFreq;
        }
    }
}
