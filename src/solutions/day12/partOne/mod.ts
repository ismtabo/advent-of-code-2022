import { Grid, Input, Point } from "../types.d.ts";

export interface Node {
  point: Point;
  parent?: Point;
  steps: number;
  score: number;
  from: string;
}

export function partOne({ grid, start, end }: Input) {
  const queue = new Array<Node>();
  const visited = new Map<string, Node>();
  queue.push({
    point: start,
    steps: 0,
    score: 1,
    from: "S",
  });
  while (queue.length) {
    const { point, parent, steps, score, from } = queue.shift()!;
    const neighbors = getNeighbors(point, grid);
    visited.set(`${point.x}/${point.y}`, {
      point,
      steps,
      parent,
      score,
      from,
    });
    if (point.x === end.x && point.y === end.y) {
      break;
    }
    for (const { x, y, from } of neighbors) {
      if (
        !visited.has(`${x}/${y}`) &&
        !queue.some((other) => other.point.x === x && other.point.y === y)
      ) {
        queue.push({
          point: { x, y },
          steps: steps + 1,
          parent: point,
          score: score + 1,
          from,
        });
      }
    }
  }
  let last = visited.get(`${end.x}/${end.y}`)!;
  const path = new Array<string>();
  while (last?.parent) {
    last = visited.get(`${last.parent.x}/${last.parent.y}`)!;
    path.unshift(`${last.point.x}/${last.point.y}`);
  }
  return path.length;
}

export function getNeighbors({ x, y }: Point, grid: Grid) {
  const currentCell = grid[y][x];
  const neighbors = new Array<Point & { from: string }>();
  if (y > 0) {
    const cell = grid[y - 1][x];
    if (
      cell != null &&
      (cell - currentCell === 1 || cell - currentCell <= 0)
    ) {
      neighbors.push({ x, y: y - 1, from: "^" });
    }
  }
  if (x > 0) {
    const cell = grid[y][x - 1];
    if (
      cell != null &&
      (cell - currentCell === 1 || cell - currentCell <= 0)
    ) {
      neighbors.push({ x: x - 1, y, from: "<" });
    }
  }
  if (y < grid.length - 1) {
    const cell = grid[y + 1][x];
    if (
      cell != null &&
      (cell - currentCell === 1 || cell - currentCell <= 0)
    ) {
      neighbors.push({ x, y: y + 1, from: "V" });
    }
  }
  if (x < grid[0].length - 1) {
    const cell = grid[y][x + 1];
    if (
      cell != null &&
      (cell - currentCell === 1 || cell - currentCell <= 0)
    ) {
      neighbors.push({ x: x + 1, y, from: ">" });
    }
  }
  return neighbors;
}
