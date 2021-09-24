import { Queue } from '../src';

describe('Queue', () => {
    const queue = new Queue<number>();

    beforeEach(() => {
        queue.clear();
    });

    it('should push and pop values', () => {
        queue.push(1, 2, 3);
        expect(queue.pop()).toBe(1);
        expect(queue.pop()).toBe(2);
        queue.push(4);
        expect(queue.pop()).toBe(3);
        expect(queue.pop()).toBe(4);
        expect(queue.isEmpty()).toBe(true);
        expect(queue.pop(-1)).toBe(-1);
    });

    it('should give the peek value', () => {
        queue.push(1, 2);
        expect(queue.peek()).toBe(1);
        queue.pop();
        expect(queue.peek()).toBe(2);
        queue.push(0);
        expect(queue.peek()).toBe(2);
    });

    it('should give if it is empty or not and give current size', () => {
        expect(queue.isEmpty()).toBe(true);
        queue.push(1, 2);
        expect(queue.isEmpty()).toBe(false);
        queue.pop();
        expect(queue.size).toBe(1);
    });
});
