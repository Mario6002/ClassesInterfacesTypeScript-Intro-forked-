import { WorldModel } from './WorldModel';
import { Snake } from './Snake';
import { Food } from './Food';
import { Point } from './Point';
import { ActorCollisionHandlers } from './ActorCollisionHandlers';
import { SnakeFoodCollisionHandler } from './SnakeFoodCollisionHandler';
import { SnakeSnakeCollisionHandler } from './SnakeSnakeCollisionHandler';

describe('WorldModel with actors', () => {
    let worldModel: WorldModel;
    let collisionHandlers: ActorCollisionHandlers;

    beforeEach(() => {
        collisionHandlers = new ActorCollisionHandlers();
        collisionHandlers.addCollisionAction("snake", "food", new SnakeFoodCollisionHandler());
        collisionHandlers.addCollisionAction("snake", "snake", new SnakeSnakeCollisionHandler());
        worldModel = new WorldModel(collisionHandlers);
    });

    test('addActor adds to collection', () => {
        const snake = new Snake(new Point(5, 5), 2);
        worldModel.addActor(snake);
        
        const iterator = worldModel.getActors();
        const first = iterator.next();
        expect(first.value).toBe(snake);
        expect(first.done).toBe(false);
    });

    test('getActors returns iterator', () => {
        const snake = new Snake(new Point(5, 5), 2);
        worldModel.addActor(snake);
        
        const iterator = worldModel.getActors();
        expect(iterator.next().value).toBe(snake);
        expect(iterator.next().done).toBe(true);
    });

    test('update handles snake-food collision', () => {
        const snake = new Snake(new Point(5, 5), 2);
        const food = new Food(6, 5);
        
        worldModel.addActor(snake);
        worldModel.addActor(food);
        
        // Move snake to food
        snake.move(); // Snake moves right to (6,5)
        
        worldModel.update();
        
        expect(food.isActive).toBe(false);
        expect(snake.getAllParts().length).toBe(3); // Grew by 1
    });
});
