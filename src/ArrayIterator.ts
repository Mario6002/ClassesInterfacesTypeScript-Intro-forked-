/**
 * Iterator for arrays that provides next() method
 */
export class ArrayIterator<T> {
    /** The array being iterated */
    private arr: T[];
    
    /** Current index in the iteration */
    private index: number;

    /**
     * Creates a new ArrayIterator
     * @param arr - The array to iterate over
     */
    constructor(arr: T[]) {
        this.arr = arr;
        this.index = 0;
    }

    /**
     * Returns the next item in the iteration
     * @returns Object with value and done flag
     */
    next(): { value: T | undefined; done: boolean } {
        if (this.index < this.arr.length) {
            const value = this.arr[this.index];
            this.index++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }
}
