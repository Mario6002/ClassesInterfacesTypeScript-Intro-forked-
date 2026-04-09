import { ActorCollisionHandlers } from './ActorCollisionHandlers';
import { SnakeFoodCollisionHandler } from './SnakeFoodCollisionHandler';
import { SnakeSnakeCollisionHandler } from './SnakeSnakeCollisionHandler';
import { Snake } from './Snake';
import { Food } from './Food';
import { Point } from './Point';

describe('ActorCollisionHandlers', () => {
    let handlers: ActorCollisionHandlers;

    beforeEach(() => {
        handlers = new ActorCollisionHandlers();
    });

    test('addCollisionAction stores handler', () => {
        const handler = new SnakeFoodCollisionHandler();
        handlers.addCollisionAction("snake", "food", handler);
        expect(handlers.hasCollisionAction("snake", "food")).toBe(true);
    });

    test('hasCollisionAction returns false for non-existent pair', () => {
        expect(handlers.hasCollisionAction("snake", "wall")).toBe(false);
    });

    test('applyCollisionAction calls handler for snake-food', () => {
        const snake = new Snake(new Point(5, 5), 2);
        const food = new Food(6, 5);
        const handler = new SnakeFoodCollisionHandler();
        handlers.addCollisionAction("snake", "food", handler);
        
        const eatSpy = jest.spyOn(food, 'eat');
        const growSpy = jest.spyOn(snake, 'grow');
        
        handlers.applyCollisionAction(snake, food);
        
        expect(eatSpy).toHaveBeenCalled();
        expect(growSpy).toHaveBeenCalled();
    });

    test('applyCollisionAction calls handler for snake-snake', () => {
        const snake1 = new Snake(new Point(5, 5), 2);
        const snake2 = new Snake(new Point(5, 6), 2);
        const handler = new SnakeSnakeCollisionHandler();
        handlers.addCollisionAction("snake", "snake", handler);
        
        const dieSpy = jest.spyOn(snake1, 'die');
        
        handlers.applyCollisionAction(snake1, snake2);
        
        expect(dieSpy).toHaveBeenCalled();
    });
});
