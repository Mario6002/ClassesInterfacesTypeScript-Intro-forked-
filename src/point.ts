/**
 * Represents an immutable point in 2D space.
 */
export class Point {
  private readonly xcoord: number;
  private readonly ycoord: number;

  /**
   * Creates a new Point.
   * @param x The x-coordinate
   * @param y The y-coordinate
   */
  constructor(x: number, y: number) {
    this.xcoord = x;
    this.ycoord = y;
  }

  /**
   * Gets the x-coordinate.
   */
  get x(): number {
    return this.xcoord;
  }

  /**
   * Gets the y-coordinate.
   */
  get y(): number {
    return this.ycoord;
  }
}
