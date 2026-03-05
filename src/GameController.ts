import { WorldModel } from './WorldModel';
import { Player } from './Player';

/**
 * Controls the game loop and manages multiple players
 * Handles timing and updates for the game world
 */
export class GameController {
    /** The game world being controlled */
    private world: WorldModel;
    
    /** First player in the game */
    private player1: Player | null = null;
    
    /** Second player in the game */
    private player2: Player | null = null;
    
    /** Animation frame ID for cleanup */
    private animationFrameId: number | null = null;

    /**
     * Creates a new GameController
     * @param world - The WorldModel to control
     */
    constructor(world: WorldModel) {
        this.world = world;
    }

    /**
     * Sets player 1
     * @param player - The player to set as player 1
     */
    setPlayer1(player: Player): void {
        this.player1 = player;
    }

    /**
     * Sets player 2
     * @param player - The player to set as player 2
     */
    setPlayer2(player: Player): void {
        this.player2 = player;
    }

    /**
     * Starts the game loop
     * Uses requestAnimationFrame for smooth animation
     */
    run(): void {
        let lastTime = 0;
        const updateInterval = 250; // milliseconds between world updates

        const updateFrame = (currentTime: number) => {
            // Make turns for both players
            if (this.player1) {
                this.player1.makeTurn();
            }
            if (this.player2) {
                this.player2.makeTurn();
            }

            // Update world if enough time has passed
            if (lastTime === 0) {
                lastTime = currentTime;
            } else if (currentTime - lastTime >= updateInterval) {
                this.world.update();
                lastTime = currentTime;
            }

            // Continue the game loop
            this.animationFrameId = requestAnimationFrame(updateFrame);
        };

        // Start the loop
        this.animationFrameId = requestAnimationFrame(updateFrame);
    }

    /**
     * Stops the game loop
     */
    stop(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}
