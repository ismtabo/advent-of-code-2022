export interface Point {
  x: number;
  y: number;
}

export type Input = {
  beacon: Point;
  sensor: Point;
}[];
