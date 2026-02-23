import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Point } from '../src/point';
import { Snake } from '../src/snake';
import { WorldModel } from '../src/worldModel';
import { SnakeController } from '../src/snakeController';
import { AvoidWallsPlayer } from '../src/avoidWallsPlayer';

describe('SnakeController', () => {
    describe('Constructor and Properties', () => {
        it('should create a SnakeController with correct properties', () => {
            const world = new WorldModel(10, 10);
            const snake = new Snake([new Point(5, 5)]);
            const controller = new SnakeController(world, snake);

            expect(controller.worldWidth).to.equal(10);
            expect(controller.worldHeight).to.equal(10);
            expect(controller.snakeDirection).to.equal('right');
        });
    });

    describe('Snake Control Methods', () => {
        it('should turn snake left', () => {
            const world = new WorldModel(10, 10);
            const snake = new Snake([new Point(5, 5)]);
            const controller = new SnakeController(world, snake);

            controller.turnSnakeLeft();
            expect(controller.snakeDirection).to.equal('up');
        });

        it('should turn snake right', () => {
            const world = new WorldModel(10, 10);
            const snake = new Snake([new Point(5, 5)]);
            const controller = new SnakeController(world, snake);

            controller.turnSnakeRight();
            expect(controller.snakeDirection).to.equal('down');
        });
    });

    describe('AvoidWallsPlayer', () => {
        it('should turn left when at left wall in top half', () => {
            const world = new WorldModel(10, 10);
            const snake = new Snake([new Point(0, 2)]);
            snake.turnLeft(); // Set direction to up
            snake.turnLeft(); // Set direction to left
            const controller = new SnakeController(world, snake);
            const player = new AvoidWallsPlayer(controller);

            player.makeTurn();
            expect(controller.snakeDirection).to.equal('up');
        });

        it('should turn right when at left wall in bottom half', () => {
            const world = new WorldModel(10, 10);
            const snake = new Snake([new Point(0, 7)]);
            snake.turnLeft(); // Set direction to up
            snake.turnLeft(); // Set direction to left
            const controller = new SnakeController(world, snake);
            const player = new AvoidWallsPlayer(controller);

            player.makeTurn();
            expect(controller.snakeDirection).to.equal('down');
        });

        it('should not turn when not near a wall', () => {
            const world = new WorldModel(10, 10);
            const snake = new Snake([new Point(5, 5)]);
            const controller = new SnakeController(world, snake);
            const player = new AvoidWallsPlayer(controller);
            const initialDirection = controller.snakeDirection;

            player.makeTurn();
            expect(controller.snakeDirection).to.equal(initialDirection);
        });

        it('should turn appropriately at top wall', () => {
            const world = new WorldModel(10, 10);
            const snake = new Snake([new Point(2, 0)]);
            snake.turnLeft(); // Set direction to up
            const controller = new SnakeController(world, snake);
            const player = new AvoidWallsPlayer(controller);

            player.makeTurn();
            expect(controller.snakeDirection).to.equal('right');
        });

        it('should turn appropriately at bottom wall', () => {
            const world = new WorldModel(10, 10);
            const snake = new Snake([new Point(7, 9)]);
            // Turn to face down
            snake.turnRight(); // face down
            const controller = new SnakeController(world, snake);
            const player = new AvoidWallsPlayer(controller);

            player.makeTurn();
            expect(controller.snakeDirection).to.equal('left');
        });
    });
});
