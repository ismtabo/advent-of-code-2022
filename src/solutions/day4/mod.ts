import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  return text.trim().split("\n").map((line) =>
    line.split(",", 2)
      .map((range) => range.split("-", 2).map((number) => parseInt(number)))
      .map((
        [start, end],
      ) => ({
        start,
        end,
      }))
  ).map(([first, second]) => ({
    first,
    second,
  }));
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
