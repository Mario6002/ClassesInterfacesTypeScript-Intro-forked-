import { Snake } from "./Snake";

/**
 * Represents the world model containing a snake.
 */
export class WorldModel {
  private snake: Snake;

  /**
   * Creates a WorldModel with an existing Snake.
   * @param snake The snake in the world
   */
  constructor(snake: Snake) {
    this.snake = snake;
  }

  /**
   * Updates the world by moving the snake.
   * @param steps Number of steps to move
   */
  update(steps: number): void {
    this.snake.move(steps);
  }

  /**
   * Gets the snake.
   */
  getSnake(): Snake {
    return this.snake;
  }
}
