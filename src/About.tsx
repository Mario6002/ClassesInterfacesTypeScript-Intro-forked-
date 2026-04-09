
import React, { useEffect, useRef } from 'react';
import { Point } from './Point';
import { Snake } from './Snake';
import { Food } from './Food';
import { WorldModel } from './WorldModel';
import { CanvasWorldView } from './CanvasWorldView';
import { SnakeController } from './SnakeController';
import { LRKeyInputHandler } from './LRKeyInputHandler';
import { HumanPlayer } from './HumanPlayer';
import { AvoidWallsPlayer } from './AvoidWallsPlayer';
import { GameController } from './GameController';
import { ActorCollisionHandlers } from './ActorCollisionHandlers';
import { SnakeFoodCollisionHandler } from './SnakeFoodCollisionHandler';
import { SnakeSnakeCollisionHandler } from './SnakeSnakeCollisionHandler';
import './App.css';

function App() {
  const gameControllerRef = useRef<GameController | null>(null);
  const inputHandlerRef = useRef<LRKeyInputHandler | null>(null);

  useEffect(() => {
    // Create collision handlers
    const collisionHandlers = new ActorCollisionHandlers();
    collisionHandlers.addCollisionAction("snake", "food", new SnakeFoodCollisionHandler());
    collisionHandlers.addCollisionAction("snake", "snake", new SnakeSnakeCollisionHandler());
    
    // Create world model with collision handlers
    const worldModel = new WorldModel(collisionHandlers);
    
    // Create snakes
    const snake1 = new Snake(new Point(5, 10), 3);
    const snake2 = new Snake(new Point(15, 10), 3);
    
    // Create food
    const food = new Food(10, 10);
    
    // Add actors to world
    worldModel.addActor(snake1);
    worldModel.addActor(snake2);
    worldModel.addActor(food);
    
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
      <h1>Snake Game - With Food and Collisions!</h1>
      <p>Use left and right arrow keys to control the green snake</p>
      <p>Eat the food (red square) to grow!</p>
    </div>
  );
}

export default App;
