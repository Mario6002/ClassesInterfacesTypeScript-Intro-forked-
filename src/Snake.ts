import { Point } from './Point';
import { Direction } from './Direction';

/**
 * Represents a snake in the game with multiple body parts
 */
export class Snake {
    /** Array of points representing each part of the snake (head first, tail last) */
    private currentParts: Point[];
    
    /** Current movement direction of the snake */
    private direction: Direction;
    
    /** Initial position of the snake's head */
    private startPosition: Point;
    
    /** Length of the snake (number of parts) */
    private size: number;

    /**
     * Creates a new Snake
     * @param startPosition - Initial head position
     * @param size - Initial length of the snake (minimum 1)
     */
    constructor(startPosition: Point, size: number) {
        this.startPosition = startPosition;
        this.size = size;
        this.currentParts = [];
        this.direction = Direction.Right;
        
        // Initialize snake parts
        // Start with head at startPosition
        this.currentParts.push(new Point(startPosition.x, startPosition.y));
        
        // Add tail parts extending to the left (assuming initial direction is Right)
        for (let i = 1; i < size; i++) {
            this.currentParts.push(new Point(startPosition.x - i, startPosition.y));
        }
    }

    /**
     * Gets the current position of the snake's head
     * @returns The head position
     */
    getHeadPosition(): Point {
        return this.currentParts[0];
    }

    /**
     * Gets all parts of the snake
     * @returns Array of points representing snake parts
     */
    getAllParts(): Point[] {
        return [...this.currentParts];
    }

    /**
     * Gets the current movement direction
     * @returns Current direction
     */
    getDirection(): Direction {
        return this.direction;
    }

    /**
     * Turns the snake left
     */
    turnLeft(): void {
        switch (this.direction) {
            case Direction.Up:
                this.direction = Direction.Left;
                break;
            case Direction.Down:
                this.direction = Direction.Right;
                break;
            case Direction.Left:
                this.direction = Direction.Down;
                break;
            case Direction.Right:
                this.direction = Direction.Up;
                break;
        }
    }

    /**
     * Turns the snake right
     */
    turnRight(): void {
        switch (this.direction) {
            case Direction.Up:
                this.direction = Direction.Right;
                break;
            case Direction.Down:
                this.direction = Direction.Left;
                break;
            case Direction.Left:
                this.direction = Direction.Up;
                break;
            case Direction.Right:
                this.direction = Direction.Down;
                break;
        }
    }

    /**
     * Moves the snake forward
     * Updates all body parts to follow the head
     */
    move(): void {
        // Move tail parts forward (from back to front)
        for (let i = this.currentParts.length - 1; i > 0; i--) {
            this.currentParts[i] = new Point(this.currentParts[i - 1].x, this.currentParts[i - 1].y);
        }
        
        // Move head based on current direction
        const head = this.currentParts[0];
        let newHead: Point;
        
        switch (this.direction) {
            case Direction.Up:
                newHead = new Point(head.x, head.y - 1);
                break;
            case Direction.Down:
                newHead = new Point(head.x, head.y + 1);
                break;
            case Direction.Left:
                newHead = new Point(head.x - 1, head.y);
                break;
            case Direction.Right:
                newHead = new Point(head.x + 1, head.y);
                break;
        }
        
        this.currentParts[0] = newHead;
    }

    /**
     * Checks if this snake collides with another snake
     * @param otherSnake - The snake to check collision with
     * @returns True if this snake's head collides with any part of the other snake
     */
    didCollide(otherSnake: Snake): boolean {
        const head = this.getHeadPosition();
        
        // Check collision with all parts of the other snake
        const otherParts = otherSnake.getAllParts();
        
        for (const part of otherParts) {
            if (head.equals(part)) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Checks if this snake collides with itself
     * @returns True if head collides with any tail part
     */
    didCollideWithSelf(): boolean {
        const head = this.getHeadPosition();
        const tailParts = this.currentParts.slice(1); // All parts except head
        
        for (const part of tailParts) {
            if (head.equals(part)) {
                return true;
            }
        }
        
        return false;
    }
}
