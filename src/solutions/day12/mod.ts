import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function validate(text: string): boolean {
  const lines = text.trim().split("\n").map((line) => line.trim());
  return lines.every((line) => /^[SEa-z]+$/.test(line.trim())) &&
    lines.every((line) => line.length === lines.at(0)?.length) &&
    lines.flatMap((line) => Array.from(line)).filter((cell) => cell === "S")
        .length === 1 &&
    lines.flatMap((line) => Array.from(line)).filter((cell) => cell === "E")
        .length === 1;
}

export function preprocess(text: string) {
  const grid = text.trim().split("\n").map((line) => Array.from(line.trim()));
  const sX = grid.reduce(
    (acc, row) => Math.max(acc, row.findIndex((val) => val === "S")),
    -1,
  );
  const sY = grid.findIndex((row) => row.includes("S"));
  const eX = grid.reduce(
    (acc, row) => Math.max(acc, row.findIndex((val) => val === "E")),
    -1,
  );
  const eY = grid.findIndex((row) => row.includes("E"));
  const map = grid.map((row) =>
    row.map((val) =>
      val === "S" ? -1 : val === "E" ? 26 : val.charCodeAt(0) - 97
    )
  );
  return { grid: map, start: { x: sX, y: sY }, end: { x: eX, y: eY } };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
