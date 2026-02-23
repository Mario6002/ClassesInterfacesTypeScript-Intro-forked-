import { WorldModel } from './worldModel';
import { Snake } from './snake';
import { Point } from './point';

/**
 * Controller that mediates between Player and the game world
 * Provides limited access to Snake and WorldModel functionality
 */
export class SnakeController {
    private snakeWorld: WorldModel;
    private slitherer: Snake;

    /**
     * Creates a new SnakeController
     * @param world - The world model containing the snake
     * @param snake - The snake to control
     */
    constructor(world: WorldModel, snake: Snake) {
        this.snakeWorld = world;
        this.slitherer = snake;
    }

    /**
     * Turns the controlled snake left
     */
    turnSnakeLeft(): void {
        this.slitherer.turnLeft();
    }

    /**
     * Turns the controlled snake right
     */
    turnSnakeRight(): void {
        this.slitherer.turnRight();
    }

    /**
     * Gets the current position of the controlled snake
     */
    get snakePosition(): Point[] {
        return this.slitherer.position;
    }

    /**
     * Gets the current direction of the controlled snake
     */
    get snakeDirection(): string {
        return this.slitherer.direction;
    }

    /**
     * Gets the world width
     */
    get worldWidth(): number {
        return this.snakeWorld.width;
    }

    /**
     * Gets the world height
     */
    get worldHeight(): number {
        return this.snakeWorld.height;
    }
}
