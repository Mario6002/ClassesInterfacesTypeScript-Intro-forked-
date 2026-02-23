import { Player } from './player';
import { SnakeController } from './snakeController';

/**
 * Player that avoids walls by turning when necessary
 */
export class AvoidWallsPlayer extends Player {
    /**
     * Creates a new AvoidWallsPlayer
     * @param controller - The snake controller for this player
     */
    constructor(controller: SnakeController) {
        super(controller);
    }

    /**
     * Makes a turn decision based on wall proximity
     * Turns left or right to avoid hitting walls
     */
    makeTurn(): void {
        const head = this.sc.snakePosition[0];
        const direction = this.sc.snakeDirection;
        const worldHeight = this.sc.worldHeight;

        // Check if about to hit a wall
        const willHitWall = 
            (direction === 'left' && head.x === 0) ||
            (direction === 'right' && head.x === this.sc.worldWidth - 1) ||
            (direction === 'up' && head.y === 0) ||
            (direction === 'down' && head.y === worldHeight - 1);

        if (!willHitWall) {
            return; // No need to turn
        }

        // Determine best direction to turn based on available space
        if (direction === 'left' || direction === 'right') {
            // At left or right wall, decide to go up or down based on position
            if (head.y <= worldHeight / 2) {
                // In top half, go down for more space
                this.sc.turnSnakeRight();
            } else {
                // In bottom half, go up for more space
                this.sc.turnSnakeLeft();
            }
        } else {
            // At top or bottom wall, decide to go left or right based on position
            if (head.x <= this.sc.worldWidth / 2) {
                // In left half, go right for more space
                this.sc.turnSnakeRight();
            } else {
                // In right half, go left for more space
                this.sc.turnSnakeLeft();
            }
        }
    }
}
