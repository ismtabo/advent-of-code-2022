import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export const partTwoAvailable=true;

export function validate(text: string): boolean {
  return text.trim().split("\n").every((line) =>
    /^[a-zA-Z]{2,}$/.test(line.trim())
  );
}

export function preprocess(text: string) {
  return text.trim().split("\n");
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
