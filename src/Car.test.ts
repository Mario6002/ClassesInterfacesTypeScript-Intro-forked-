/*
import Car from "./Car";

const driveCars = (times: number) => {
  const greenCar = new Car("green");
  const maroonCar = new Car("maroon");
  let totalMiles = 0;

  for (let i = 0; i < times; i++) {
    const numMiles1 = Math.floor(Math.random() * 100);
    const numMiles2 = Math.floor(Math.random() * 100);
    greenCar.drive(numMiles1);
    maroonCar.drive(numMiles2);
    greenCar.drive(5);
    totalMiles += numMiles2;
  }

  return { actual: maroonCar.miles, expected: totalMiles };
};

describe("Car", () => {
  const tests = [0, 3, 10].map((num, index) => driveCars(num));

  const testDescriptions = [
    "starts with the correct miles of 0",
    "has the correct number of miles after 3+ random drives",
    "has the correct number of miles after 10+ random drives",
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
