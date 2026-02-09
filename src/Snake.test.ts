import { Snake } from "./Snake";

test("Snake moves right by default", () => {
  const snake = new Snake();
  snake.move(4);

  expect(snake.getPosition().x).toBe(4);
  expect(snake.getPosition().y).toBe(0);
});

test("Snake turns left and moves up", () => {
  const snake = new Snake();
  snake.turnLeft(); // right → up
  snake.move(3);

  expect(snake.getPosition().x).toBe(0);
  expect(snake.getPosition().y).toBe(3);
});

test("Snake turns right and moves down", () => {
  const snake = new Snake();
  snake.turnRight(); // right → down
  snake.move(2);

  expect(snake.getPosition().x).toBe(0);
  expect(snake.getPosition().y).toBe(-2);
});
