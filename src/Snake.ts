export class Snake {
    // private attributes
    private currentPosition: number;
    private currentDirection: number;
  
    constructor() {
      // starts at position 0, facing forward
      this.currentPosition = 0;
      this.currentDirection = 1;
    }
  
    // move the snake
    move(squares: number): void {
      if (this.currentDirection === 1) {
        this.currentPosition += squares;
      } else {
        this.currentPosition -= squares;
      }
    }
  
    // turn the snake around
    turn(): void {
      if (this.currentDirection === 1) {
        this.currentDirection = -1;
      } else {
        this.currentDirection = 1;
      }
    }
  
    // getter for position
    get position(): number {
      return this.currentPosition;
    }
  }