import { ICollisionHandler } from './ICollisionHandler';
import { IActor } from './IActor';

/**
 * Manages collision handlers for different actor type pairs
 */
export class ActorCollisionHandlers {
    /** Map storing collision handlers keyed by "type1,type2" */
    private pairs: Map<string, ICollisionHandler>;

    /**
     * Creates a new ActorCollisionHandlers instance
     */
    constructor() {
        this.pairs = new Map();
    }

    /**
     * Creates a string key from two actor types
     * @param colliderType - Type of the colliding actor
     * @param collidedType - Type of the actor being collided with
     * @returns Combined key string
     */
    private toKey(colliderType: string, collidedType: string): string {
        return `${colliderType},${collidedType}`;
    }

    /**
     * Adds a collision action handler for a specific pair of actor types
     * @param colliderType - Type of the colliding actor
     * @param collidedType - Type of the actor being collided with
     * @param actionApplicator - The collision handler to use
     */
    addCollisionAction(
        colliderType: string,
        collidedType: string,
        actionApplicator: ICollisionHandler
    ): void {
        const key = this.toKey(colliderType, collidedType);
        this.pairs.set(key, actionApplicator);
    }

    /**
     * Checks if a collision handler exists for the given actor types
     * @param colliderType - Type of the colliding actor
     * @param collidedType - Type of the actor being collided with
     * @returns True if handler exists, false otherwise
     */
    hasCollisionAction(colliderType: string, collidedType: string): boolean {
        const key = this.toKey(colliderType, collidedType);
        return this.pairs.has(key);
    }

    /**
     * Applies the appropriate collision action for two colliding actors
     * @param collider - The first actor in the collision
     * @param collided - The second actor in the collision
     */
    applyCollisionAction(collider: IActor, collided: IActor): void {
        const key = this.toKey(collider.type, collided.type);
        const handler = this.pairs.get(key);
        if (handler) {
            handler.applyAction(collider, collided);
        }
    }
}
