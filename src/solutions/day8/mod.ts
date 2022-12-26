import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export const partTwoAvailable=true;

export function validate(text: string): boolean {
  return text.trim().split("\n").every((line, _, lines) =>
    line.trim().length === lines.at(0)!.trim().length &&
    /^[0-9]+$/.test(line.trim())
  );
}

export function preprocess(text: string) {
  return text.trim().split("\n").map((line) =>
    Array.from(line.trim()).map((char) => parseInt(char))
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
