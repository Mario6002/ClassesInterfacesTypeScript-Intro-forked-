/**
 * Interface for handling player input in the Snake game
 * Abstracts different input methods (keyboard, touch, buttons, etc.)
 */
export interface IInputHandler {
    /**
     * Checks if a left move was made since the last reset
     * @returns True if left move was requested, false otherwise
     */
    madeLeftMove(): boolean;

    /**
     * Checks if a right move was made since the last reset
     * @returns True if right move was requested, false otherwise
     */
    madeRightMove(): boolean;

    /**
     * Resets the left move state (acknowledges the input has been processed)
     */
    resetLeftMove(): void;

    /**
     * Resets the right move state (acknowledges the input has been processed)
     */
    resetRightMove(): void;
}
