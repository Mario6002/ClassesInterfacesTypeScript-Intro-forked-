import { ICollisionHandler } from './ICollisionHandler';
import { IActor } from './IActor';
import { Snake } from './Snake';
import { Food } from './Food';

/**
 * Handles collision between a snake and food
 */
export class SnakeFoodCollisionHandler implements ICollisionHandler {
    /**
     * Applies snake-food collision: food is eaten, snake grows
     * @param collider - The snake (first actor)
     * @param collided - The food (second actor)
     */
    applyAction(collider: IActor, collided: IActor): void {
        const snake = collider as Snake;
        const food = collided as Food;
        food.eat();
        snake.grow();
    }
}
