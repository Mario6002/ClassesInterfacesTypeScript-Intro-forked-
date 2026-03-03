import { Snake } from './Snake';
import { IWorldView } from './IWorldView';

/**
 * Represents the game world containing the snake and managing game state
 */
export class WorldModel {
    /** The snake in the world */
    private snake: Snake;
    
    /** Width of the world in grid units */
    public readonly width: number = 10;
    
    /** Height of the world in grid units */
    public readonly height: number = 10;
    
    /** The view associated with this world model */
    private worldView: IWorldView | null = null;

    /**
     * Creates a new WorldModel
     * @param snake - The snake to place in the world
     */
    constructor(snake: Snake) {
        this.snake = snake;
    }

    /**
     * Updates the world state
     * Moves the snake and refreshes the view if one exists
     */
    update(): void {
        this.snake.move();
        
        // Update the view if it exists
        if (this.worldView !== null) {
            this.worldView.display(this);
        }
    }

    /**
     * Gets the current snake
     * @returns The snake object
     */
    getSnake(): Snake {
        return this.snake;
    }

    /**
     * Sets the view for this world model
     * @param view - The IWorldView implementation to use for rendering
     */
    setView(view: IWorldView): void {
        this.worldView = view;
    }
}
