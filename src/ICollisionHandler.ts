import { IActor } from './IActor';

/**
 * Handles collision actions between two actors
 */
export interface ICollisionHandler {
    /**
     * Applies the collision action to the colliding actors
     * @param collider - The first actor involved in the collision
     * @param collided - The second actor involved in the collision
     */
    applyAction(collider: IActor, collided: IActor): void;
}
