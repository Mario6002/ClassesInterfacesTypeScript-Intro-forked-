 import { IWorldView } from './IWorldView';
import { WorldModel } from './WorldModel';
import { Snake } from './Snake';

/**
 * Canvas-based implementation of the World View
 * Renders multiple snakes using HTML5 Canvas
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

        // Clear the canvas with a white background
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.worldCanvas.width, this.worldCanvas.height);

        // Get iterator over all actors
        const actorsIterator = model.getActors();
        let result = actorsIterator.next();
        
        while (!result.done) {
            const actor = result.value;
            // Only render snakes (we can extend to render food later)
            if (actor && actor.type === "snake") {
                const snake = actor as Snake;
                if (snake.isActive) {
                    this.drawSnake(snake);
                }
            }
            result = actorsIterator.next();
        }
    }
    
    /**
     * Draws a single snake on the canvas
     * @param snake - The snake to draw
     */
    private drawSnake(snake: Snake): void {
        const parts = snake.getAllParts();
        const snakeColor = "green";
        
        parts.forEach((part, partIndex) => {
            // Head is slightly darker
            const color = partIndex === 0 ? this.darkenColor(snakeColor) : snakeColor;
            
            this.context.fillStyle = color;
            this.context.fillRect(
                part.x * this.scalingFactor,
                part.y * this.scalingFactor,
                this.scalingFactor,
                this.scalingFactor
            );
            
            // Add a border to each segment for better visibility
            this.context.strokeStyle = "black";
            this.context.strokeRect(
                part.x * this.scalingFactor,
                part.y * this.scalingFactor,
                this.scalingFactor,
                this.scalingFactor
            );
        });
    }
    
    /**
     * Darkens a color for the snake's head
     * @param color - The base color
     * @returns Darkened color
     */
    private darkenColor(color: string): string {
        switch(color) {
            case "green": return "darkgreen";
            case "blue": return "darkblue";
            case "red": return "darkred";
            case "orange": return "darkorange";
            case "purple": return "indigo";
            default: return color;
        }
    }
}
