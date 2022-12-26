import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export const partTwoAvailable = true;

export function validate(text: string): boolean {
  const [rawCrates, rawMoves] = text.split("\n\n", 2);
  if (rawCrates == null || rawCrates === "") {
    return false;
  }
  if (rawMoves == null || rawMoves === "") {
    return false;
  }
  const crates = rawCrates.split("\n");
  const validateCrates =
    crates.every((line, _, arr) => line.length === arr.at(0)?.length) &&
    crates.slice(0, -1).every((line) =>
      /^(\s{3}|\[[A-Z]\])(\s(\s{3}|\[[A-Z]\]))+$/.test(line)
    ) &&
    /^(\s[0-9]\s)( \s[0-9]\s)+$/.test(crates.at(-1)!);
  if (!validateCrates) {
    return false;
  }
  const moves = rawMoves.trim().split("\n");
  const validateMoves = moves.every((line) =>
    /^move \d+ from [0-9] to [0-9]$/.test(line.trim())
  );
  return validateMoves;
}

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
