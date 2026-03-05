import { Player } from './Player';
import { SnakeController } from './SnakeController';
import { IInputHandler } from './IInputHandler';

/**
 * Human-controlled player that uses input handler for turning decisions
 */
export class HumanPlayer extends Player {
    /** Controller for manipulating the snake */
    private snakeController: SnakeController;
    
    /** Input handler for detecting player intentions */
    private inputHandler: IInputHandler;

    /**
     * Creates a new HumanPlayer
     * @param snakeController - Controller for the snake this player controls
     * @param inputHandler - Input handler for detecting player commands
     */
    constructor(snakeController: SnakeController, inputHandler: IInputHandler) {
        super();
        this.snakeController = snakeController;
        this.inputHandler = inputHandler;
    }

    /**
     * Makes a turn decision based on player input
     * If left move detected, turns snake left
     * If right move detected, turns snake right
     * Resets input states after processing
     */
    makeTurn(): void {
        if (this.inputHandler.madeLeftMove()) {
            this.snakeController.turnSnakeLeft();
            this.inputHandler.resetLeftMove();
        } else if (this.inputHandler.madeRightMove()) {
            this.snakeController.turnSnakeRight();
            this.inputHandler.resetRightMove();
        }
        // If no input detected, take no action
    }
}
