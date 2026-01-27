import { Snake } from "./Snake";

function App() {
  const snake1 = new Snake();
  snake1.move(5);      // position should be 5
  snake1.turn();       // now facing backward
  snake1.move(2);      // position should be 3

  const snake2 = new Snake();
  snake2.turn();       // backward
  snake2.move(10);     // position should be -10

  console.log("Snake 1 position:", snake1.position); // 3
  console.log("Snake 2 position:", snake2.position); // -10

  return <div>Check the console for Snake positions 🐍</div>;
}

export default App;

