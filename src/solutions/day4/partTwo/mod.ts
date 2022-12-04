import { Pair } from "../types.d.ts";

export function partTwo(input: Pair[]) {
  return input.filter(({ first, second }) => (
    (first.start <= second.start && first.end >= second.start) ||
    (second.start <= first.start && second.end >= first.start)
  ))
    .length;
}
