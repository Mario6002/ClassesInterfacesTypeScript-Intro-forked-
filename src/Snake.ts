import { Point } from './Point';
import { Direction } from './Direction';
import { IActor } from './IActor';
import { ICollidable } from './ICollidable';

/**
 * Represents a snake in the game with multiple body parts
 * Implements ICollidable for collision detection
 */
export class Snake implements ICollidable {
    /** Array of points representing each part of the snake (head first, tail last) */
    private currentParts: Point[];
    
    /** Current movement direction of the snake */
    private direction: Direction;
    
    /** Initial position of the snake's head */
    private startPosition: Point;
    
    /** Length of the snake (number of parts) */
    private size: number;
    
    /** Whether the snake is currently active/alive */
    private isCurrentlyActive: boolean;

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
        this.isCurrentlyActive = true;
        
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
     * Gets whether the snake is active/alive
     */
    get isActive(): boolean {
        return this.isCurrentlyActive;
    }

    /**
     * Gets the type identifier for this actor
     */
    get type(): string {
        return "snake";
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
     * Updates the snake (calls move)
     */
    update(): void {
        this.move();
    }

    /**
     * Kills the snake (sets inactive)
     */
    die(): void {
        this.isCurrentlyActive = false;
    }

    /**
     * Grows the snake by adding a new segment at the tail
     * The new segment is placed adjacent to the current tail
     */
    grow(): void {
        const tail = this.currentParts[this.currentParts.length - 1];
        let newSegment: Point;
        
        // Determine direction from second-last to last to add new segment
        if (this.currentParts.length >= 2) {
            const secondLast = this.currentParts[this.currentParts.length - 2];
            if (tail.x === secondLast.x) {
                // Vertical movement
                if (tail.y > secondLast.y) {
                    newSegment = new Point(tail.x, tail.y + 1);
                } else {
                    newSegment = new Point(tail.x, tail.y - 1);
                }
            } else {
                // Horizontal movement
                if (tail.x > secondLast.x) {
                    newSegment = new Point(tail.x + 1, tail.y);
                } else {
                    newSegment = new Point(tail.x - 1, tail.y);
                }
            }
        } else {
            // If only head exists, add segment based on direction
            switch (this.direction) {
                case Direction.Up:
                    newSegment = new Point(tail.x, tail.y + 1);
                    break;
                case Direction.Down:
                    newSegment = new Point(tail.x, tail.y - 1);
                    break;
                case Direction.Left:
                    newSegment = new Point(tail.x + 1, tail.y);
                    break;
                case Direction.Right:
                    newSegment = new Point(tail.x - 1, tail.y);
                    break;
            }
        }
        
        this.currentParts.push(newSegment);
    }

    /**
     * Checks if this snake collides with another actor
     * @param other - The other actor to check collision with
     * @returns True if collided, false otherwise
     */
    didCollide(other: IActor): boolean {
        // Handle collision with non-snake actors (like food)
        if (other.type !== "snake") {
            const otherPos = (other as any).position;
            return this.getHeadPosition().equals(otherPos);
        }
        
        // Handle collision with other snakes
        const otherSnake = other as Snake;
        const head = this.getHeadPosition();
        const otherParts = otherSnake.getAllParts();
        
        for (const part of otherParts) {
            if (head.equals(part)) {
                return true;
            }
        }
        
        return false;
    }
}
