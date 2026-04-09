import { IActor } from './IActor';
import { IWorldView } from './IWorldView';
import { ArrayIterator } from './ArrayIterator';
import { ActorCollisionHandlers } from './ActorCollisionHandlers';

/**
 * Represents the game world containing multiple actors and views
 * Manages game state and collision detection
 */
export class WorldModel {
    /** Width of the world in grid units */
    public readonly width: number = 20;
    
    /** Height of the world in grid units */
    public readonly height: number = 20;
    
    /** Collection of actors in the world */
    private actors: IActor[] = [];
    
    /** Collection of views attached to this world */
    private allViews: IWorldView[] = [];
    
    /** Collision handler registry */
    private collisionHandlers: ActorCollisionHandlers;

    /**
     * Creates a new WorldModel
     * @param aca - ActorCollisionHandlers instance for handling collisions
     */
    constructor(aca: ActorCollisionHandlers) {
        this.collisionHandlers = aca;
    }

    /**
     * Adds an actor to the world
     * @param actor - The actor to add
     */
    addActor(actor: IActor): void {
        this.actors.push(actor);
    }

    /**
     * Adds a view to the world
     * @param view - The view to add
     */
    addView(view: IWorldView): void {
        this.allViews.push(view);
    }

    /**
     * Gets an iterator over all actors
     * @returns ArrayIterator for actors
     */
    getActors(): ArrayIterator<IActor> {
        return new ArrayIterator(this.actors);
    }

    /**
     * Updates the world state
     * Updates all actors, checks for collisions, removes dead actors,
     * and refreshes all views
     */
    update(): void {
        // Update all actors
        const actorIterator = this.getActors();
        let result = actorIterator.next();
        while (!result.done) {
            const actor = result.value;
            if (actor) {
                actor.update();
            }
            result = actorIterator.next();
        }
        
        // Check for collisions and collect actors to remove
        const actorsToRemove: IActor[] = [];
        
        // Check each pair of actors for collisions
        for (let i = 0; i < this.actors.length; i++) {
            const actorA = this.actors[i];
            
            // Only check collisions for ICollidable actors
            if (this.isCollidable(actorA)) {
                for (let j = 0; j < this.actors.length; j++) {
                    if (i === j) continue;
                    const actorB = this.actors[j];
                    
                    if (this.isCollidable(actorB) && (actorA as any).didCollide(actorB)) {
                        // Apply collision action
                        this.collisionHandlers.applyCollisionAction(actorA, actorB);
                        
                        // Mark for removal if no longer active
                        if (!(actorA as any).isActive && !actorsToRemove.includes(actorA)) {
                            actorsToRemove.push(actorA);
                        }
                        if (!(actorB as any).isActive && !actorsToRemove.includes(actorB)) {
                            actorsToRemove.push(actorB);
                        }
                    }
                }
            }
        }
        
        // Remove inactive actors
        for (const actorToRemove of actorsToRemove) {
            const index = this.actors.indexOf(actorToRemove);
            if (index !== -1) {
                this.actors.splice(index, 1);
            }
        }
        
        // Update all views
        for (const view of this.allViews) {
            view.display(this);
        }
    }
    
    /**
     * Type guard to check if an actor is collidable
     * @param actor - The actor to check
     * @returns True if the actor has didCollide method
     */
    private isCollidable(actor: IActor): boolean {
        return typeof (actor as any).didCollide === 'function';
    }
}
