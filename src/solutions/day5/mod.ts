import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  const [rawCrates, rawMoves] = text.split("\n\n", 2);
  const transposeCrates = Array.from(
    rawCrates.split("\n").reverse().map((line) => line.split(""))
      .reduce(
        (acc, line) => {
          line.forEach((char, i) =>
            acc.set(i, (acc.get(i) ?? []).concat(char))
          );
          return acc;
        },
        new Map<number, string[]>(),
      ).values(),
  );
  const crates = transposeCrates.filter((line) => /^\d+$/.test(line.at(0)!))
    .reduce(
      (acc, [index, ...rest]) =>
        acc.set(index, rest.filter((char) => char !== " ")),
      new Map<string, string[]>(),
    );
  const moves = rawMoves.trim().split("\n").map((line) =>
    line.trim().match(/move (?<crate>\d+) from (?<from>\d+) to (?<to>\d+)/)
  )
    .map((match) => ({
      items: parseInt(match?.groups?.["crate"]! ?? ""),
      from: match?.groups?.["from"]! ?? "",
      to: match?.groups?.["to"]! ?? "",
    }));
  return { crates, moves };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
