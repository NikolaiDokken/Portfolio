export default class Ball {
  mass: number;
  position: any;
  velocity: any;
  acceleration: any;

  constructor(mass: number, x: number, y: number) {
    this.mass = mass;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }
}
