import { choosePoints } from "../partOne/mod.ts";

const loseTo = new Map([
  ["A", "Y"],
  ["B", "Z"],
  ["C", "X"],
]);

const drawTo = new Map([
  ["A", "X"],
  ["B", "Y"],
  ["C", "Z"],
]);

const winTo = new Map([
  ["A", "Z"],
  ["B", "X"],
  ["C", "Y"],
]);

const intentionPoints = new Map(
  [["X", 0], ["Y", 3], ["Z", 6]],
);

function getDecision(others: string, intention: string) {
  switch (intention) {
    case "X":
      return winTo.get(others)!;
    case "Y":
      return drawTo.get(others)!;
    case "Z":
      return loseTo.get(others)!;
  }
}

export function partTwo(input: string[][]) {
  return input.map(([others, intention]) => {
    const mine = getDecision(others, intention)!;
    const pointForIntention = intentionPoints.get(intention)!;
    const pointsForChoose = choosePoints.get(mine)!;
    return pointForIntention + pointsForChoose;
  }).reduce((x, y) => x + y, 0);
}
