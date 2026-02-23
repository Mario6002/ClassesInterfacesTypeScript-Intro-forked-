import { SnakeController } from './snakeController';

/**
 * Abstract base class for all players
 */
export abstract class Player {
    protected sc: SnakeController;

    /**
     * Creates a new Player
     * @param controller - The snake controller for this player
     */
    constructor(controller: SnakeController) {
        this.sc = controller;
    }

    /**
     * Abstract method that defines the player's turn action
     */
    abstract makeTurn(): void;
}
