import { IActor } from './IActor';
import { Point } from './Point';

/**
 * Represents a food item in the game that snakes can eat
 */
export class Food implements IActor {
    /** Current position of the food */
    private currentPosition: Point;
    
    /** Whether the food is currently active and can be eaten */
    private isCurrentlyActive: boolean;

    /**
     * Creates a new Food item
     * @param x - X-coordinate of the food
     * @param y - Y-coordinate of the food
     */
    constructor(x: number, y: number) {
        this.currentPosition = new Point(x, y);
        this.isCurrentlyActive = true;
    }

    /**
     * Gets the current position of the food
     */
    get position(): Point {
        return this.currentPosition;
    }

    /**
     * Gets whether the food is active
     */
    get isActive(): boolean {
        return this.isCurrentlyActive;
    }

    /**
     * Gets the type identifier for this actor
     */
    get type(): string {
        return "food";
    }

    /**
     * Marks the food as eaten (inactive)
     */
    eat(): void {
        this.isCurrentlyActive = false;
    }

    /**
     * Update method (no behavior needed for food)
     */
    update(): void {
        // Food doesn't need to update automatically
    }
} 
