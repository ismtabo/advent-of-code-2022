import { print } from "../partOne/mod.ts";

export function partTwo(input: string[][]) {
  const map = new Map<string, string>();
  input.forEach((line) => {
    line.slice(0, -1).forEach((start, i) => {
      const [startX, startY] = start.split(",", 2).map((item) =>
        parseInt(item)
      );
      const [endX, endY] = line[i + 1]!.split(",", 2).map((item) =>
        parseInt(item)
      );
      if (startX !== endX) {
        for (let i = Math.min(startX, endX); i <= Math.max(startX, endX); i++) {
          map.set(`${i},${startY}`, "#");
        }
      }
      if (startY !== endY) {
        for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
          map.set(`${startX},${i}`, "#");
        }
      }
    });
  });
  const abyssStart = Math.max(
    ...Array.from(map.keys()).map((item) => parseInt(item.split(",").at(1)!)),
  );
  const floor = abyssStart + 2;
  let sandX: number, sandY: number;

  sand:
  while (true) {
    sandX = 500;
    sandY = 0;
    while (true) {
      if (!isOccupied(map, floor, sandX, sandY + 1)) {
        sandY += 1;
        continue;
      }
      if (!isOccupied(map, floor, sandX - 1, sandY + 1)) {
        sandX -= 1;
        sandY += 1;
        continue;
      }
      if (!isOccupied(map, floor, sandX + 1, sandY + 1)) {
        sandX += 1;
        sandY += 1;
        continue;
      }
      map.set(`${sandX},${sandY}`, "o");
      if (sandX === 500 && sandY === 0) {
        break sand;
      }
      break;
    }
  }
  return Array.from(map.values()).filter((value) => value === "o").length;
}

function isOccupied(
  map: Map<string, string>,
  floor: number,
  x: number,
  y: number,
): boolean {
  if (y === floor) {
    return true;
  }
  return ["o", "#"].includes(map.get(`${x},${y}`)!);
}
