 import { CanvasWorldView } from './CanvasWorldView';
import { WorldModel } from './WorldModel';
import { Snake } from './Snake';

// Mock the DOM
document.body.innerHTML = '<div></div>';
document.createElement = jest.fn().mockImplementation((tag: string) => {
    return {
        getContext: jest.fn().mockReturnValue({
            fillStyle: '',
            fillRect: jest.fn()
        }),
        width: 0,
        height: 0,
        style: {}
    };
});

describe('CanvasWorldView', () => {
    let canvasWorldView: CanvasWorldView;
    let mockWorldModel: WorldModel;
    let mockSnake: Snake;

    beforeEach(() => {
        mockSnake = new Snake();
        mockWorldModel = new WorldModel(mockSnake);
        canvasWorldView = new CanvasWorldView(10);
        
        // Mock the canvas context
        canvasWorldView['context'] = {
            fillStyle: '',
            fillRect: jest.fn()
        } as any;
    });

    test('constructor initializes properties correctly', () => {
        expect(canvasWorldView['scalingFactor']).toBe(10);
        expect(canvasWorldView['worldCanvas']).toBeDefined();
        expect(canvasWorldView['context']).toBeDefined();
    });

    test('display sets canvas dimensions based on world size', () => {
        const mockCanvas = { width: 0, height: 0 } as HTMLCanvasElement;
        canvasWorldView['worldCanvas'] = mockCanvas;
        
        canvasWorldView.display(mockWorldModel);
        
        expect(mockCanvas.width).toBe(mockWorldModel.width * 10);
        expect(mockCanvas.height).toBe(mockWorldModel.height * 10);
    });

    test('display draws the snake on canvas', () => {
        const mockFillRect = jest.fn();
        canvasWorldView['context'].fillRect = mockFillRect;
        
        canvasWorldView.display(mockWorldModel);
        
        expect(mockFillRect).toHaveBeenCalled();
        expect(canvasWorldView['context'].fillStyle).toBe('green');
    });

    test('display clears canvas before drawing', () => {
        const mockFillRect = jest.fn();
        canvasWorldView['context'].fillRect = mockFillRect;
        
        canvasWorldView.display(mockWorldModel);
        
        // First call should be clearing the canvas (white)
        expect(mockFillRect.mock.calls[0][0]).toBe(0);
        expect(mockFillRect.mock.calls[0][1]).toBe(0);
        expect(canvasWorldView['context'].fillStyle).toBe('white');
    });
});
