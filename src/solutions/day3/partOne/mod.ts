export function partOne(input: string[]) {
  return input.map((rucksack) => {
    const inBoth = extractInBoth(rucksack);
    return inBoth.map(calculatePriority()).reduce((x, y) => x + y, 0);
  }).reduce((x, y) => x + y, 0);
}

export function extractInBoth(rucksack: string) {
  const half = Math.floor(rucksack.length / 2);
  const first = Array.of(...rucksack.slice(0, half));
  const second = Array.of(...rucksack.slice(half));
  const inBoth = Array.from(
    new Set(
      Array.from(first).filter((value) => second.includes(value)),
    ),
  );
  return inBoth;
}

export function calculatePriority(): (
  value: string,
  index: number,
  array: string[],
) => number {
  return (value) =>
    /[a-z]/.test(value)
      ? value.charCodeAt(0) - 96
      : value.charCodeAt(0) - 64 + 26;
}
