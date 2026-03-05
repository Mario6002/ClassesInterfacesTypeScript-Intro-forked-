import { LRKeyInputHandler } from './LRKeyInputHandler';

describe('LRKeyInputHandler', () => {
    let inputHandler: LRKeyInputHandler;

    beforeEach(() => {
        inputHandler = new LRKeyInputHandler();
    });

    afterEach(() => {
        inputHandler.destroy();
    });

    test('constructor initializes properties to false', () => {
        expect(inputHandler.madeLeftMove()).toBe(false);
        expect(inputHandler.madeRightMove()).toBe(false);
    });

    test('madeLeftMove returns true after left arrow key press', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        window.dispatchEvent(event);
        
        expect(inputHandler.madeLeftMove()).toBe(true);
        expect(inputHandler.madeRightMove()).toBe(false);
    });

    test('madeRightMove returns true after right arrow key press', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        window.dispatchEvent(event);
        
        expect(inputHandler.madeRightMove()).toBe(true);
        expect(inputHandler.madeLeftMove()).toBe(false);
    });

    test('resetLeftMove sets left move state to false', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        window.dispatchEvent(event);
        
        expect(inputHandler.madeLeftMove()).toBe(true);
        
        inputHandler.resetLeftMove();
        expect(inputHandler.madeLeftMove()).toBe(false);
    });

    test('resetRightMove sets right move state to false', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        window.dispatchEvent(event);
        
        expect(inputHandler.madeRightMove()).toBe(true);
        
        inputHandler.resetRightMove();
        expect(inputHandler.madeRightMove()).toBe(false);
    });

    test('multiple key presses are tracked correctly', () => {
        // Press left
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
        expect(inputHandler.madeLeftMove()).toBe(true);
        expect(inputHandler.madeRightMove()).toBe(false);
        
        // Reset left
        inputHandler.resetLeftMove();
        expect(inputHandler.madeLeftMove()).toBe(false);
        
        // Press right
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        expect(inputHandler.madeRightMove()).toBe(true);
        expect(inputHandler.madeLeftMove()).toBe(false);
    });

    test('destroy removes event listener', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        
        inputHandler.destroy();
        
        expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
});
