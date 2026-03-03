import React, { useEffect } from 'react';
import { Snake } from './Snake';
import { WorldModel } from './WorldModel';
import { CanvasWorldView } from './CanvasWorldView';
import './App.css';

function App() {
  useEffect(() => {
    // Create a snake
    const snake = new Snake();
    
    // Create the world model with the snake
    const worldModel = new WorldModel(snake);
    
    // Create a canvas view with scaling factor of 50 (each grid unit = 50x50 pixels)
    const canvasView = new CanvasWorldView(50);
    
    // Set the view for the world model
    worldModel.setView(canvasView);
    
    // Update the world model to trigger initial rendering
    worldModel.update();
    
    // Optional: Set up animation loop for continuous updates
    const intervalId = setInterval(() => {
      worldModel.update();
    }, 500); // Update every 500ms
    
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Snake Game</h1>
    </div>
  );
}

export default App;
