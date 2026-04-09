import { Food } from './Food';
import { Point } from './Point';

describe('Food', () => {
    test('constructor sets position correctly', () => {
        const food = new Food(5, 10);
        expect(food.position.x).toBe(5);
        expect(food.position.y).toBe(10);
    });

    test('isActive initially true', () => {
        const food = new Food(1, 1);
        expect(food.isActive).toBe(true);
    });

    test('eat sets isActive to false', () => {
        const food = new Food(2, 3);
        food.eat();
        expect(food.isActive).toBe(false);
    });

    test('type returns "food"', () => {
        const food = new Food(0, 0);
        expect(food.type).toBe("food");
    });

    test('update does nothing', () => {
        const food = new Food(5, 5);
        const originalPos = food.position;
        food.update();
        expect(food.position).toBe(originalPos);
    });
});
