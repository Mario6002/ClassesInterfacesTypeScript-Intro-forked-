import { Snake } from './Snake';
import { IWorldView } from './IWorldView';

/**
 * Represents the game world containing multiple snakes and views
 * Manages game state and collision detection
 */
export class WorldModel {
    /** Width of the world in grid units */
    public readonly width: number = 20;
    
    /** Height of the world in grid units */
    public readonly height: number = 20;
    
    /** Collection of snakes in the world */
    private allSnakes: Snake[] = [];
    
    /** Collection of views attached to this world */
    private allViews: IWorldView[] = [];

    /**
     * Creates a new WorldModel
     */
    constructor() {
        // No parameters needed - snakes and views are added via methods
    }

    /**
     * Adds a snake to the world
     * @param snake - The snake to add
     */
    addSnake(snake: Snake): void {
        this.allSnakes.push(snake);
    }

    /**
     * Adds a view to the world
     * @param view - The view to add
     */
    addView(view: IWorldView): void {
        this.allViews.push(view);
    }

    /**
     * Gets all snakes in the world
     * @returns Array of all snakes
     */
    getAllSnakes(): Snake[] {
        return [...this.allSnakes]; // Return a copy to prevent external modification
    }

    /**
     * Updates the world state
     * Moves all snakes, checks for collisions, removes dead snakes,
     * and refreshes all views
     */
    update(): void {
        // Move all snakes
        for (const snake of this.allSnakes) {
            snake.move();
        }
        
        // Check for collisions and collect snakes to remove
        const snakesToRemove: Snake[] = [];
        
        // Check each pair of snakes for collisions
        for (let i = 0; i < this.allSnakes.length; i++) {
            const snakeA = this.allSnakes[i];
            
            // Check self-collision
            if (snakeA.didCollideWithSelf()) {
                if (!snakesToRemove.includes(snakeA)) {
                    snakesToRemove.push(snakeA);
                }
                continue; // Skip other checks if already colliding with self
            }
            
            // Check collisions with other snakes
            for (let j = 0; j < this.allSnakes.length; j++) {
                if (i === j) continue; // Skip self
                
                const snakeB = this.allSnakes[j];
                
                // Check if snakeA's head collides with snakeB
                if (snakeA.didCollide(snakeB)) {
                    if (!snakesToRemove.includes(snakeA)) {
                        snakesToRemove.push(snakeA);
                    }
                }
            }
        }
        
        // Remove collided snakes
        for (const snakeToRemove of snakesToRemove) {
            const index = this.allSnakes.indexOf(snakeToRemove);
            if (index !== -1) {
                this.allSnakes.splice(index, 1);
            }
        }
        
        // Update all views
        for (const view of this.allViews) {
            view.display(this);
        }
    }
}
