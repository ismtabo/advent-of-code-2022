import { calculatePriority } from "../partOne/mod.ts";

export function partTwo(input: string[]) {
  const numberOfGroups = Math.floor(input.length / 3);
  const groups = new Array(numberOfGroups).fill(null).map((_, i) => i).map((
    i,
  ) => input.slice(i * 3, (i + 1) * 3));
  const repeatedPacks = groups
    .map((group) => {
      const groupRepeatedPacks = Array.of(...group.at(0)!).filter((pack) =>
        group.slice(1).every((other) => other.includes(pack))
      );
      return Array.from(
        new Set(
          groupRepeatedPacks,
        ),
      );
    });
  return repeatedPacks.flat().map(calculatePriority()).reduce(
    (x, y) => x + y,
    0,
  );
}
