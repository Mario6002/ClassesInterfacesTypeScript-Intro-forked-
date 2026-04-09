import { Snake } from './Snake';
import { Point } from './Point';
import { Direction } from './Direction';

describe('Snake grow method', () => {
    test('grow adds a segment to the tail', () => {
        const snake = new Snake(new Point(5, 5), 2);
        const originalLength = snake.getAllParts().length;
        snake.grow();
        expect(snake.getAllParts().length).toBe(originalLength + 1);
    });

    test('grow adds segment in correct direction for horizontal snake', () => {
        const snake = new Snake(new Point(5, 5), 3);
        // Snake parts: [ (5,5), (4,5), (3,5) ]
        snake.grow();
        const parts = snake.getAllParts();
        const tail = parts[parts.length - 1];
        // Should extend left (decreasing x)
        expect(tail.x).toBe(2);
        expect(tail.y).toBe(5);
    });
});
