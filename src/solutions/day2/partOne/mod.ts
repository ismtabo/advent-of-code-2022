export const choosePoints = new Map(
  [["X", 1], ["Y", 2], ["Z", 3]],
);

export function getResult(mine: string, others: string) {
  if (mine === others) {
    return "draw";
  }
  switch (mine) {
    case "X":
      if (others === "C") return "win";
      break;
    case "Y":
      if (others === "A") return "win";
      break;
    case "Z":
      if (others === "B") return "win";
      break;
  }
  return "loose";
}

export function partOne(input: string[][]) {
  return input.map(([others, mine]) => {
    const result = getResult(mine, others);
    let points = result === "loose" ? 0 : result === "draw" ? 3 : 6;
    points += choosePoints.get(mine)!;
    return points;
  }).reduce((x, y) => x + y, 0);
}
