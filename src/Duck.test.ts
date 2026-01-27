/*
import Duck from "./Duck";

const quackDucks = (times: number) => {
  const greenDuck = new Duck("green");
  const maroonDuck = new Duck("maroon");
  let totalQuacks = 0;

  for (let i = 0; i < times; i++) {
    const numQuacks1 = Math.floor(Math.random() * 100);
    const numQuacks2 = Math.floor(Math.random() * 100);
    greenDuck.quack(numQuacks1);
    maroonDuck.quack(numQuacks2);
    greenDuck.quack(5);
    totalQuacks += numQuacks2;
  }

  return { actual: maroonDuck.quacks, expected: totalQuacks };
};

describe("Duck", () => {
  const tests = [0, 3, 10].map((num, index) => quackDucks(num));

  const testDescriptions = [
    "starts with the correct quacks of 0",
    "has the correct number of quacks after 3+ random quackings",
    "has the correct number of quacks after 10+ random quackings",
  ];

  testDescriptions.forEach((description, index) => {
    it(description, () =>
      expect(tests[index].expected).toBe(tests[index].actual),
    );
  });
});
*/

describe("Addition", function () {
  it("sums numbers", () => {
    expect(1 + 1).toEqual(2);
  });
});

export default {};
