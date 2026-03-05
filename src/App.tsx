import React, { useEffect, useRef } from 'react';
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
    // Create snakes for both players
    const snake1 = new Snake();
    const snake2 = new Snake(); // Second snake for AI player
    
    // Create world model
    const worldModel = new WorldModel(snake1);
    
    // Create canvas view
    const canvasView = new CanvasWorldView(30);
    worldModel.setView(canvasView);
    
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
      <h1>Snake Game - Human vs AI</h1>
      <p>Use left and right arrow keys to control the green snake</p>
    </div>
  );
}

export default App;
