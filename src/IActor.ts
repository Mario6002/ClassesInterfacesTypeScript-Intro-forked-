/**
 * Represents any active entity in the game world
 */
export interface IActor {
    /**
     * Updates the actor's state
     */
    update(): void;
}
