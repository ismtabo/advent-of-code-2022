import { partOne } from "../partOne/mod.ts";
import { Input } from "../types.d.ts";

export function partTwo(input: Input) {
  return partOne(input, 10000, true);
}
