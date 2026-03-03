import { IWorldView } from './IWorldView';
import { WorldModel } from './WorldModel';

/**
 * Canvas-based implementation of the World View
 * Renders the Snake game using HTML5 Canvas
 */
export class CanvasWorldView implements IWorldView {
    /** Number of pixels per grid unit */
    private scalingFactor: number;
    
    /** The canvas element used for rendering */
    private worldCanvas: HTMLCanvasElement;
    
    /** The 2D rendering context for the canvas */
    private context: CanvasRenderingContext2D;

    /**
     * Creates a new CanvasWorldView
     * @param scalingFactor - Pixels per grid unit (e.g., 10 means each grid cell is 10x10 pixels)
     */
    constructor(scalingFactor: number) {
        this.scalingFactor = scalingFactor;
        this.worldCanvas = document.createElement("canvas");
        this.context = this.worldCanvas.getContext("2d")!;
        document.body.appendChild(this.worldCanvas);
    }

    /**
     * Renders the current world state on the canvas
     * @param model - The WorldModel containing the game state to render
     */
    display(model: WorldModel): void {
        // Set canvas dimensions based on world size and scaling factor
        this.worldCanvas.width = model.width * this.scalingFactor;
        this.worldCanvas.height = model.height * this.scalingFactor;

        // Clear the canvas
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.worldCanvas.width, this.worldCanvas.height);

        // Get the snake from the model
        const snake = model.getSnake();
        
        // Draw the snake's head
        this.context.fillStyle = "green";
        this.context.fillRect(
            snake.getHeadPosition().x * this.scalingFactor,
            snake.getHeadPosition().y * this.scalingFactor,
            this.scalingFactor,
            this.scalingFactor
        );
    }
}
