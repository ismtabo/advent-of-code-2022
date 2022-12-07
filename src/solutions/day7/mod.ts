import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function validate(text: string): boolean {
  return text.trim().split("\n").every((line, i, arr) => {
    if (/^\$ cd (\/|..|([\w.\/]+))$/.test(line.trim())) {
      return true;
    }
    if (/^\$ ls$/.test(line.trim())) {
      const nextCommandIndex = arr.slice(i + 1).findIndex((line) =>
        line.startsWith("$")
      );
      return arr.slice(i + 1, nextCommandIndex + 1).every((line) =>
        /^(dir|\d+) [\w.]+$/.test(line.trim())
      );
    }
    return /^(dir|\d+) [\w.]+$/.test(line.trim());
  });
}

export function preprocess(text: string) {
  return text.trim().split("\n").map((line) => line.trim());
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
