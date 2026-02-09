import { Snake } from "./Snake";
import { WorldModel } from "./WorldModel";

test("WorldModel updates snake position", () => {
  const snake = new Snake();
  const world = new WorldModel(snake);

  world.update(5);
  expect(snake.getPosition().x).toBe(5);
  expect(snake.getPosition().y).toBe(0);

  snake.turnLeft(); // right → up
  world.update(2);

  expect(snake.getPosition().x).toBe(5);
  expect(snake.getPosition().y).toBe(2);
});
