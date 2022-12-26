import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export const partTwoAvailable=true;

export function validate(text: string): boolean {
  return /^[a-z]+$/.test(text.trim());
}

export function preprocess(text: string) {
  return text.trim();
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
