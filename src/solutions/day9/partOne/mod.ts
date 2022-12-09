import { Move } from "../types.d.ts";
import { Direction } from "../types.ts";

interface State {
  head: {
    x: number;
    y: number;
  };
  tail: {
    x: number;
    y: number;
  }[];
  visited: Set<string>;
}

function reduceMove(state: State, move: Move): State {
  const newState = {
    ...state,
    head: { ...state.head },
    tail: { ...state.tail },
  };
  for (let i = 0; i < move.steps; i++) {
    newState.head = moveHead(move, newState.head);
    newState.tail = [moveTail(newState.head, state.tail.at(0)!)];
    state.tail.slice(1).forEach((tail, i) =>
      newState.tail.push(moveTail(newState.tail.at(i)!, tail))
    );
    newState.visited.add(
      `${newState.tail.at(-1)!.x}/${newState.tail.at(-1)!.y}`,
    );
    state = {
      ...newState,
      head: { ...newState.head },
      tail: newState.tail.map((tail) => ({ ...tail })),
    };
  }
  return newState;
}

function moveHead(move: Move, head: State["head"]) {
  switch (move.direction) {
    case Direction.UP:
      return { ...head, y: head.y + 1 };
    case Direction.LEFT:
      return { ...head, x: head.x - 1 };
    case Direction.RIGHT:
      return { ...head, x: head.x + 1 };
    case Direction.DOWN:
      return { ...head, y: head.y - 1 };
  }
}

function moveTail(
  head: { x: number; y: number },
  tail: { x: number; y: number },
) {
  let dirX: -1 | 0 | 1;
  let dirY: -1 | 0 | 1;
  switch (true) {
    case Math.abs(head.x - tail.x) +
        Math.abs(head.y - tail.y) > 2:
      dirX = head.x === tail.x ? 0 : head.x < tail.x ? -1 : 1;
      dirY = head.y === tail.y ? 0 : head.y < tail.y ? -1 : 1;
      return { x: tail.x + dirX, y: tail.y + dirY };
    case Math.abs(head.x - tail.x) > 1:
      dirX = head.x < tail.x ? -1 : 1;
      return { ...tail, x: tail.x + dirX };
    case Math.abs(head.y - tail.y) > 1:
      dirY = head.y < tail.y ? -1 : 1;
      return { ...tail, y: tail.y + dirY };
    default:
      return { ...tail };
  }
}

export function partOne(input: Move[], tailSize = 1) {
  const endState = input.reduce(
    (state, move) => reduceMove(state, move),
    {
      head: { x: 0, y: 0 },
      tail: new Array(tailSize).fill(null).map(() => ({ x: 0, y: 0 })),
      visited: new Set<string>([`0/0`]),
    },
  );
  return endState.visited.size;
}
