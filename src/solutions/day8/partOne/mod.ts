export function partOne(input: number[][]) {
  return input.flat().filter((height, position) => {
    const x = Math.floor(position % input[0].length);
    const y = Math.floor(position / input[0].length);
    return input.at(y)!.slice(0, x).every((other) => other < height) ||
      input.at(y)!.slice(x + 1).every((other) => other < height) ||
      input.slice(0, y).every((row) => row.at(x)! < height) ||
      input.slice(y + 1).every((row) => row.at(x)! < height);
  }).length;
}
