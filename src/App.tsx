import React, { useEffect, useRef } from 'react';
import { Point } from './Point';
import { Snake } from './Snake';
import { WorldModel } from './WorldModel';
import { CanvasWorldView } from './CanvasWorldView';
import { SnakeController } from './SnakeController';
import { LRKeyInputHandler } from './LRKeyInputHandler';
import { HumanPlayer } from './HumanPlayer';
import { AvoidWallsPlayer } from './AvoidWallsPlayer';
import { GameController } from './GameController';
import './App.css';

function App() {
  const gameControllerRef = useRef<GameController | null>(null);
  const inputHandlerRef = useRef<LRKeyInputHandler | null>(null);

  useEffect(() => {
    // Create world model (no parameters now)
    const worldModel = new WorldModel();
    
    // Create multiple snakes
    const snake1 = new Snake(new Point(5, 10), 3); // Green snake
    const snake2 = new Snake(new Point(15, 10), 4); // Blue snake (AI)
    const snake3 = new Snake(new Point(10, 5), 3); // Red snake (optional)
    
    // Add snakes to world
    worldModel.addSnake(snake1);
    worldModel.addSnake(snake2);
    worldModel.addSnake(snake3);
    
    // Create canvas view
    const canvasView = new CanvasWorldView(30);
    worldModel.addView(canvasView);
    
    // Create snake controllers
    const controller1 = new SnakeController(worldModel, snake1);
    const controller2 = new SnakeController(worldModel, snake2);
    
    // Create input handler for human player
    const inputHandler = new LRKeyInputHandler();
    inputHandlerRef.current = inputHandler;
    
    // Create players
    const humanPlayer = new HumanPlayer(controller1, inputHandler);
    const aiPlayer = new AvoidWallsPlayer(controller2);
    
    // Create and configure game controller
    const gameController = new GameController(worldModel);
    gameController.setPlayer1(humanPlayer);
    gameController.setPlayer2(aiPlayer);
    gameControllerRef.current = gameController;
    
    // Start the game
    gameController.run();
    
    // Cleanup on unmount
    return () => {
      gameController.stop();
      if (inputHandlerRef.current) {
        inputHandlerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>Snake Game - Multiple Snakes!</h1>
      <p>Use left and right arrow keys to control the green snake</p>
      <p>Watch the AI snakes (blue) move automatically</p>
    </div>
  );
}

export default App;
