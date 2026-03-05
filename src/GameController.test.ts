import { GameController } from './GameController';
import { WorldModel } from './WorldModel';
import { Player } from './Player';
import { Snake } from './Snake';

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
    return setTimeout(callback, 0) as any;
});

global.cancelAnimationFrame = jest.fn((id) => {
    clearTimeout(id);
});

describe('GameController', () => {
    let gameController: GameController;
    let mockWorldModel: WorldModel;
    let mockPlayer1: jest.Mocked<Player>;
    let mockPlayer2: jest.Mocked<Player>;
    let mockSnake: Snake;

    beforeEach(() => {
        jest.useFakeTimers();
        
        mockSnake = new Snake();
        mockWorldModel = new WorldModel(mockSnake);
        
        // Mock Player class
        mockPlayer1 = { makeTurn: jest.fn() } as jest.Mocked<Player>;
        mockPlayer2 = { makeTurn: jest.fn() } as jest.Mocked<Player>;
        
        // Spy on world update
        jest.spyOn(mockWorldModel, 'update');
        
        gameController = new GameController(mockWorldModel);
    });

    afterEach(() => {
        gameController.stop();
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    test('constructor sets world property', () => {
        expect(gameController).toBeDefined();
    });

    test('setPlayer1 sets player1 correctly', () => {
        gameController.setPlayer1(mockPlayer1);
        // Private property, can't test directly, but we'll verify through run behavior
    });

    test('setPlayer2 sets player2 correctly', () => {
        gameController.setPlayer2(mockPlayer2);
        // Private property, can't test directly, but we'll verify through run behavior
    });

    test('run makes turns for both players', () => {
        gameController.setPlayer1(mockPlayer1);
        gameController.setPlayer2(mockPlayer2);
        
        gameController.run();
        
        // Fast-forward timers
        jest.advanceTimersByTime(1000);
        
        expect(mockPlayer1.makeTurn).toHaveBeenCalled();
        expect(mockPlayer2.makeTurn).toHaveBeenCalled();
    });

    test('run updates world at appropriate intervals', () => {
        gameController.setPlayer1(mockPlayer1);
        gameController.run();
        
        // Advance time by 250ms (one update interval)
        jest.advanceTimersByTime(250);
        
        expect(mockWorldModel.update).toHaveBeenCalledTimes(1);
        
        // Advance another 250ms
        jest.advanceTimersByTime(250);
        
        expect(mockWorldModel.update).toHaveBeenCalledTimes(2);
    });

    test('run continues loop even when not updating world', () => {
        gameController.setPlayer1(mockPlayer1);
        gameController.run();
        
        // Advance time by 100ms (less than update interval)
        jest.advanceTimersByTime(100);
        
        // World should not update, but loop continues
        expect(mockWorldModel.update).not.toHaveBeenCalled();
        expect(mockPlayer1.makeTurn).toHaveBeenCalled();
    });

    test('stop cancels animation frame', () => {
        gameController.run();
        
        const cancelSpy = jest.spyOn(global, 'cancelAnimationFrame');
        
        gameController.stop();
        
        expect(cancelSpy).toHaveBeenCalled();
    });

    test('run works with only player1', () => {
        gameController.setPlayer1(mockPlayer1);
        gameController.run();
        
        jest.advanceTimersByTime(250);
        
        expect(mockPlayer1.makeTurn).toHaveBeenCalled();
        expect(mockPlayer2.makeTurn).not.toHaveBeenCalled();
        expect(mockWorldModel.update).toHaveBeenCalled();
    });

    test('run works with only player2', () => {
        gameController.setPlayer2(mockPlayer2);
        gameController.run();
        
        jest.advanceTimersByTime(250);
        
        expect(mockPlayer1.makeTurn).not.toHaveBeenCalled();
        expect(mockPlayer2.makeTurn).toHaveBeenCalled();
        expect(mockWorldModel.update).toHaveBeenCalled();
    });
});
