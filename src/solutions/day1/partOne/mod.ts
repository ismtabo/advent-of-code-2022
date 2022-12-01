export function partOne(input: number[][]) {
  return input.reduce((max, val) => {
    const valSum = val.reduce((a, b) => a + b, 0);
    return Math.max(valSum, max);
  }, -Infinity);
}
