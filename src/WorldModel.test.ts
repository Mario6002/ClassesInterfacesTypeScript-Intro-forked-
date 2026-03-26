import { WorldModel } from './WorldModel';
import { Snake } from './Snake';
import { Point } from './Point';
import { IWorldView } from './IWorldView';

describe('WorldModel', () => {
    let worldModel: WorldModel;
    let mockView: jest.Mocked<IWorldView>;
    
    beforeEach(() => {
        worldModel = new WorldModel();
        mockView = {
            display: jest.fn()
        };
    });
    
    test('constructor initializes empty arrays', () => {
        expect(worldModel.getAllSnakes().length).toBe(0);
    });
    
    test('addSnake adds snake to collection', () => {
        const snake = new Snake(new Point(5, 5), 3);
        worldModel.addSnake(snake);
        
        expect(worldModel.getAllSnakes().length).toBe(1);
        expect(worldModel.getAllSnakes()[0]).toBe(snake);
    });
    
    test('addView adds view to collection', () => {
        worldModel.addView(mockView);
        worldModel.update(); // This should call display on all views
        
        expect(mockView.display).toHaveBeenCalledWith(worldModel);
    });
    
    test('getAllSnakes returns a copy of snakes array', () => {
        const snake = new Snake(new Point(5, 5), 3);
        worldModel.addSnake(snake);
        
        const snakes1 = worldModel.getAllSnakes();
        const snakes2 = worldModel.getAllSnakes();
        
        expect(snakes1).not.toBe(snakes2); // Different array references
        expect(snakes1).toEqual(snakes2); // Same content
    });
    
    test('update moves all snakes', () => {
        const snake1 = new Snake(new Point(5, 5), 2);
        const snake2 = new Snake(new Point(10, 10), 2);
        
        worldModel.addSnake(snake1);
        worldModel.addSnake(snake2);
        
        const initialHead1 = snake1.getHeadPosition();
        const initialHead2 = snake2.getHeadPosition();
        
        worldModel.update();
        
        expect(snake1.getHeadPosition().equals(initialHead1)).toBe(false);
        expect(snake2.getHeadPosition().equals(initialHead2)).toBe(false);
    });
    
    test('update removes colliding snakes', () => {
        const snake1 = new Snake(new Point(5, 5), 3);
        const snake2 = new Snake(new Point(6, 5), 1); // Place snake2 in path
        
        worldModel.addSnake(snake1);
        worldModel.addSnake(snake2);
        
        // Move snake1 to collide with snake2
        snake1.move(); // Snake1 head moves to (6,5) which is snake2's head position
        
        worldModel.update();
        
        // Both snakes should be removed
        expect(worldModel.getAllSnakes().length).toBe(0);
    });
    
    test('update removes snakes that collide with themselves', () => {
        const snake = new Snake(new Point(5, 5), 4);
        
        // Simulate self-collision by forcing snake to run into itself
        // This requires specific movement pattern
        // For testing, we can manually set parts to cause self-collision
        
        worldModel.addSnake(snake);
        
        // Create self-collision condition
        const parts = snake.getAllParts();
        // Force head to collide with tail
        Object.defineProperty(snake, 'getHeadPosition', {
            value: () => parts[2]
        });
        
        worldModel.update();
        
        // Snake should be removed
        expect(worldModel.getAllSnakes().length).toBe(0);
    });
    
    test('update calls display on all views', () => {
        const view1: jest.Mocked<IWorldView> = { display: jest.fn() };
        const view2: jest.Mocked<IWorldView> = { display: jest.fn() };
        
        worldModel.addView(view1);
        worldModel.addView(view2);
        worldModel.update();
        
        expect(view1.display).toHaveBeenCalledWith(worldModel);
        expect(view2.display).toHaveBeenCalledWith(worldModel);
    });
});
