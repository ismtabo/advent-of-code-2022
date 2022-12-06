export function getStarterMarker(
  input: string,
  markerLength: number = 4,
): number {
  const starterMarker = Array.from(input).reduce((acc, val) => {
    if (new Set(acc).size !== acc.length) {
      return acc.slice(1).concat(val);
    }
    return acc;
  }, Array.from(input.slice(0, markerLength)));
  return (input.match(starterMarker.join(""))?.index ?? NaN) + markerLength;
}

export function partOne(input: string) {
  return getStarterMarker(input);
}
