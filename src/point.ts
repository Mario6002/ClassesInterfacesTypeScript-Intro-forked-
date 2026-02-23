/**
 * Represents a 2D point in the game world
 */
export class Point {
    private _x: number;
    private _y: number;

    /**
     * Creates a new Point
     * @param x - The x-coordinate
     * @param y - The y-coordinate
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /**
     * Gets the x-coordinate
     */
    get x(): number {
        return this._x;
    }

    /**
     * Gets the y-coordinate
     */
    get y(): number {
        return this._y;
    }
}
