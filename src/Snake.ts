import { Point } from "./Point";

/**
 * Represents a snake in a 2D grid.
 */
export class Snake {
  private position: Point;
  private direction: "up" | "down" | "left" | "right";

  /**
   * Creates a new Snake at (0,0) facing right.
   */
  constructor() {
    this.position = new Point(0, 0);
    this.direction = "right";
  }

  /**
   * Gets the snake's current position.
   */
  getPosition(): Point {
    return this.position;
  }

  /**
   * Gets the snake's current direction.
   */
  getDirection(): string {
    return this.direction;
  }

  /**
   * Moves the snake forward.
   * @param squares Number of squares to move
   */
  move(squares: number): void {
    if (this.direction === "right") {
      this.position = new Point(this.position.x + squares, this.position.y);
    } else if (this.direction === "left") {
      this.position = new Point(this.position.x - squares, this.position.y);
    } else if (this.direction === "up") {
      this.position = new Point(this.position.x, this.position.y + squares);
    } else if (this.direction === "down") {
      this.position = new Point(this.position.x, this.position.y - squares);
    }
  }

  /**
   * Turns the snake left.
   */
  turnLeft(): void {
    if (this.direction === "up") this.direction = "left";
    else if (this.direction === "left") this.direction = "down";
    else if (this.direction === "down") this.direction = "right";
    else if (this.direction === "right") this.direction = "up";
  }

  /**
   * Turns the snake right.
   */
  turnRight(): void {
    if (this.direction === "up") this.direction = "right";
    else if (this.direction === "right") this.direction = "down";
    else if (this.direction === "down") this.direction = "left";
    else if (this.direction === "left") this.direction = "up";
  }

  /**
   * Turns the snake (deprecated).
   * @deprecated Use turnLeft() or turnRight() instead.
   */
  turn(): void {
    this.turnRight();
  }
}
