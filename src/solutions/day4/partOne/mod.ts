import { Pair } from "../types.d.ts";

export function partOne(input: Pair[]) {
  return input.filter(({ first, second }) => (
    (first.start >= second.start && first.end <= second.end) ||
    (second.start >= first.start && second.end <= first.end)
  ))
    .length;
}
