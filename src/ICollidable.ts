import { IActor } from './IActor';

/**
 * Represents an actor that can collide with other actors
 */
export interface ICollidable extends IActor {
    /**
     * Checks if this actor collides with another actor
     * @param other - The other actor to check collision with
     * @returns True if collided, false otherwise
     */
    didCollide(other: IActor): boolean;
}
