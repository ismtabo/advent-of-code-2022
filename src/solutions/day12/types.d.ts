export interface Point {
  x: number;
  y: number;
}

export type Grid = Array<Array<number>>;

export interface Input {
  grid: Grid;
  start: Point;
  end: Point;
}
