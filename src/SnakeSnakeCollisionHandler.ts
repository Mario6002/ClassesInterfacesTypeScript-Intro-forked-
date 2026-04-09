import { ICollisionHandler } from './ICollisionHandler';
import { IActor } from './IActor';
import { Snake } from './Snake';

/**
 * Handles collision between two snakes
 */
export class SnakeSnakeCollisionHandler implements ICollisionHandler {
    /**
     * Applies snake-snake collision: the first snake dies
     * @param collider - The first snake (dies)
     * @param collided - The second snake (unaffected)
     */
    applyAction(collider: IActor, collided: IActor): void {
        const snake = collider as Snake;
        snake.die();
    }
}
