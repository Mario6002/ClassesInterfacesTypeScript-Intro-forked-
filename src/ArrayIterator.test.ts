import { ArrayIterator } from './ArrayIterator';

describe('ArrayIterator', () => {
    test('iterates over array items', () => {
        const arr = [1, 2, 3];
        const iterator = new ArrayIterator(arr);
        
        expect(iterator.next()).toEqual({ value: 1, done: false });
        expect(iterator.next()).toEqual({ value: 2, done: false });
        expect(iterator.next()).toEqual({ value: 3, done: false });
        expect(iterator.next()).toEqual({ value: undefined, done: true });
    });

    test('works with empty array', () => {
        const iterator = new ArrayIterator([]);
        expect(iterator.next()).toEqual({ value: undefined, done: true });
    });

    test('works with different types', () => {
        const arr = ["a", "b", "c"];
        const iterator = new ArrayIterator(arr);
        
        expect(iterator.next()).toEqual({ value: "a", done: false });
        expect(iterator.next()).toEqual({ value: "b", done: false });
        expect(iterator.next()).toEqual({ value: "c", done: false });
        expect(iterator.next()).toEqual({ value: undefined, done: true });
    });
});
