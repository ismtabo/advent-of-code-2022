import { Input, Move } from "../types.d.ts";

function reducer(state: Input["crates"], move: Move) {
  state.set(
    move.to,
    state.get(move.to)!.concat(
      state.get(move.from)!.splice(-move.items, move.items).reverse(),
    ),
  );
  return state;
}

export function partOne(input: Input) {
  const finalState = input.moves.reduce(reducer, input.crates);
  return Array.from(finalState.values()).map((val) => val.at(-1))?.join("");
}
