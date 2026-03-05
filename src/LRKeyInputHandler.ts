import { IInputHandler } from './IInputHandler';

/**
 * Keyboard-based implementation of the Input Handler
 * Listens for left and right arrow key presses
 */
export class LRKeyInputHandler implements IInputHandler {
    /** Tracks if left arrow key was pressed since last reset */
    private wasLeftArrowPushed: boolean = false;
    
    /** Tracks if right arrow key was pressed since last reset */
    private wasRightArrowPushed: boolean = false;

    /**
     * Creates a new LRKeyInputHandler and sets up keyboard event listeners
     */
    constructor() {
        // Bind the event handler to maintain correct 'this' context
        this.handleKeyDown = this.handleKeyDown.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    /**
     * Handles keydown events to detect arrow key presses
     * @param event - The keyboard event
     */
    private handleKeyDown(event: KeyboardEvent): void {
        // Prevent default behavior for arrow keys to avoid page scrolling
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }

        // Update state based on which arrow key was pressed
        if (event.key === 'ArrowLeft') {
            this.wasLeftArrowPushed = true;
        } else if (event.key === 'ArrowRight') {
            this.wasRightArrowPushed = true;
        }
    }

    /**
     * Checks if left arrow key was pressed since last reset
     * @returns True if left arrow was pressed, false otherwise
     */
    madeLeftMove(): boolean {
        return this.wasLeftArrowPushed;
    }

    /**
     * Checks if right arrow key was pressed since last reset
     * @returns True if right arrow was pressed, false otherwise
     */
    madeRightMove(): boolean {
        return this.wasRightArrowPushed;
    }

    /**
     * Resets the left arrow key state (acknowledges the input has been processed)
     */
    resetLeftMove(): void {
        this.wasLeftArrowPushed = false;
    }

    /**
     * Resets the right arrow key state (acknowledges the input has been processed)
     */
    resetRightMove(): void {
        this.wasRightArrowPushed = false;
    }

    /**
     * Cleans up event listeners (important for component unmounting)
     */
    destroy(): void {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}
