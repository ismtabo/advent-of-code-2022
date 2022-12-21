import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Operation, Register } from "./types.d.ts";

export function validate(text: string): boolean {
  return false;
}

export function preprocess(text: string) {
  return new Map<string, Register>(
    text.trim().split("\n").map((line) => {
      const [key, value] = line.trim().split(": ", 2);
      const literal = parseInt(value);
      if (!isNaN(literal)) {
        return [key, literal];
      }
      const [left, operator, right] = value.split(" ", 3);
      return [key, { left, operator, right } as Operation];
    }),
  );
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
