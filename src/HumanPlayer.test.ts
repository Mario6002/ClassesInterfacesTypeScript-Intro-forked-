import { HumanPlayer } from './HumanPlayer';
import { SnakeController } from './SnakeController';
import { IInputHandler } from './IInputHandler';
import { WorldModel } from './WorldModel';
import { Snake } from './Snake';

describe('HumanPlayer', () => {
    let mockSnakeController: SnakeController;
    let mockInputHandler: jest.Mocked<IInputHandler>;
    let humanPlayer: HumanPlayer;
    let mockWorldModel: WorldModel;
    let mockSnake: Snake;

    beforeEach(() => {
        mockSnake = new Snake();
        mockWorldModel = new WorldModel(mockSnake);
        mockSnakeController = new SnakeController(mockWorldModel, mockSnake);
        
        // Create mock input handler
        mockInputHandler = {
            madeLeftMove: jest.fn(),
            madeRightMove: jest.fn(),
            resetLeftMove: jest.fn(),
            resetRightMove: jest.fn()
        };
        
        // Spy on snake controller methods
        jest.spyOn(mockSnakeController, 'turnSnakeLeft');
        jest.spyOn(mockSnakeController, 'turnSnakeRight');
        
        humanPlayer = new HumanPlayer(mockSnakeController, mockInputHandler);
    });

    test('constructor sets properties correctly', () => {
        expect(humanPlayer).toBeDefined();
    });

    test('makeTurn turns snake left when left move detected', () => {
        mockInputHandler.madeLeftMove.mockReturnValue(true);
        mockInputHandler.madeRightMove.mockReturnValue(false);
        
        humanPlayer.makeTurn();
        
        expect(mockSnakeController.turnSnakeLeft).toHaveBeenCalled();
        expect(mockSnakeController.turnSnakeRight).not.toHaveBeenCalled();
        expect(mockInputHandler.resetLeftMove).toHaveBeenCalled();
        expect(mockInputHandler.resetRightMove).not.toHaveBeenCalled();
    });

    test('makeTurn turns snake right when right move detected', () => {
        mockInputHandler.madeLeftMove.mockReturnValue(false);
        mockInputHandler.madeRightMove.mockReturnValue(true);
        
        humanPlayer.makeTurn();
        
        expect(mockSnakeController.turnSnakeRight).toHaveBeenCalled();
        expect(mockSnakeController.turnSnakeLeft).not.toHaveBeenCalled();
        expect(mockInputHandler.resetRightMove).toHaveBeenCalled();
        expect(mockInputHandler.resetLeftMove).not.toHaveBeenCalled();
    });

    test('makeTurn takes no action when no moves detected', () => {
        mockInputHandler.madeLeftMove.mockReturnValue(false);
        mockInputHandler.madeRightMove.mockReturnValue(false);
        
        humanPlayer.makeTurn();
        
        expect(mockSnakeController.turnSnakeLeft).not.toHaveBeenCalled();
        expect(mockSnakeController.turnSnakeRight).not.toHaveBeenCalled();
        expect(mockInputHandler.resetLeftMove).not.toHaveBeenCalled();
        expect(mockInputHandler.resetRightMove).not.toHaveBeenCalled();
    });

    test('makeTurn prioritizes left move when both are true', () => {
        mockInputHandler.madeLeftMove.mockReturnValue(true);
        mockInputHandler.madeRightMove.mockReturnValue(true);
        
        humanPlayer.makeTurn();
        
        expect(mockSnakeController.turnSnakeLeft).toHaveBeenCalled();
        expect(mockSnakeController.turnSnakeRight).not.toHaveBeenCalled();
        expect(mockInputHandler.resetLeftMove).toHaveBeenCalled();
        expect(mockInputHandler.resetRightMove).not.toHaveBeenCalled();
    });
});
