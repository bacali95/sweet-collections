import { Stack } from '../src';

describe('Stack', () => {
    const stack = new Stack<number>();

    beforeEach(() => {
        stack.clear();
    });

    it('should push and pop values', () => {
        stack.push(1, 2, 3);
        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        stack.push(4);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(1);
        expect(stack.isEmpty()).toBe(true);
        expect(stack.pop(-1)).toBe(-1);
    });

    it('should give the top value', () => {
        stack.push(1, 2);
        expect(stack.top()).toBe(2);
        stack.pop();
        expect(stack.top()).toBe(1);
        stack.push(0);
        expect(stack.top()).toBe(0);
    });

    it('should give if it is empty or not and give current size', () => {
        expect(stack.isEmpty()).toBe(true);
        stack.push(1, 2);
        expect(stack.isEmpty()).toBe(false);
        stack.pop();
        expect(stack.size).toBe(1);
    });
});
