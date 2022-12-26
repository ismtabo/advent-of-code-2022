import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Packet } from "./types.d.ts";

export const partTwoAvailable=true;

export function validate(text: string): boolean {
  return text.trim().split("\n\n").every((group) =>
    group.trim().split("\n").every((line) => {
      if (!/^[\[\]0-9,]+$/.test(line.trim())) {
        return false;
      }
      try {
        const result = JSON.parse(line);
        return Array.isArray(result);
      } catch {
        return false;
      }
    })
  );
}

export function preprocess(text: string) {
  return text.trim().split("\n\n").map((group) =>
    group.trim().split("\n").map((line) => JSON.parse(line) as Packet)
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
