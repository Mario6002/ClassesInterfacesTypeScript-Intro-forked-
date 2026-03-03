/**
 * Interface defining the view component for the Snake game
 * Responsible for rendering the game state visually
 */
export interface IWorldView {
    /**
     * Renders the current state of the world model
     * @param model - The WorldModel containing the current game state
     */
    display(model: WorldModel): void;
}
