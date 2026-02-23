 import { Point } from './point';

/**
 * Represents a snake in the game
 */
export class Snake {
    private _position: Point[];
    private _direction: string;
    private readonly directions: string[] = ['up', 'right', 'down', 'left'];

    /**
     * Creates a new Snake
     * @param position - Initial position points of the snake
     */
    constructor(position: Point[]) {
        this._position = [...position];
        this._direction = 'right';
    }

    /**
     * Gets the snake's position
     */
    get position(): Point[] {
        return [...this._position];
    }

    /**
     * Gets the snake's current direction
     */
    get direction(): string {
        return this._direction;
    }

    /**
     * Moves the snake forward one step
     */
    move(): void {
        const head = this._position[0];
        let newHead: Point;

        switch (this._direction) {
            case 'up':
                newHead = new Point(head.x, head.y - 1);
                break;
            case 'down':
                newHead = new Point(head.x, head.y + 1);
                break;
            case 'left':
                newHead = new Point(head.x - 1, head.y);
                break;
            case 'right':
                newHead = new Point(head.x + 1, head.y);
                break;
            default:
                newHead = head;
        }

        this._position = [newHead, ...this._position.slice(0, -1)];
    }

    /**
     * Turns the snake left
     */
    turnLeft(): void {
        const currentIndex = this.directions.indexOf(this._direction);
        this._direction = this.directions[(currentIndex + 3) % 4];
    }

    /**
     * Turns the snake right
     */
    turnRight(): void {
        const currentIndex = this.directions.indexOf(this._direction);
        this._direction = this.directions[(currentIndex + 1) % 4];
    }
}
