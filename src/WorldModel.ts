import { Snake } from './snake';

/**
 * Represents the game world containing all snakes
 */
export class WorldModel {
    private _width: number;
    private _height: number;
    private _snakes: Snake[];

    /**
     * Creates a new WorldModel
     * @param width - Width of the world
     * @param height - Height of the world
     * @param snakes - Initial snakes in the world
     */
    constructor(width: number, height: number, snakes: Snake[] = []) {
        this._width = width;
        this._height = height;
        this._snakes = snakes;
    }

    /**
     * Gets the world width
     */
    get width(): number {
        return this._width;
    }

    /**
     * Gets the world height
     */
    get height(): number {
        return this._height;
    }

    /**
     * Gets all snakes in the world
     */
    get snakes(): Snake[] {
        return [...this._snakes];
    }

    /**
     * Updates the world state
     */
    update(): void {
        this._snakes.forEach(snake => snake.move());
    }
}
