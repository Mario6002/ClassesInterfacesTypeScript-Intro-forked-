/**
 * Represents a point in 2D space with x and y coordinates
 */
export class Point {
    /** X-coordinate of the point */
    public x: number;
    
    /** Y-coordinate of the point */
    public y: number;

    /**
     * Creates a new Point
     * @param x - X-coordinate
     * @param y - Y-coordinate
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Checks if this point equals another point
     * @param p - The point to compare with
     * @returns True if both x and y coordinates match, false otherwise
     */
    equals(p: Point): boolean {
        return this.x === p.x && this.y === p.y;
    }
}
