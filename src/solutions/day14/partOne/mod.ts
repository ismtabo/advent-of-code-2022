export function partOne(input: string[][]) {
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
  let sandX: number, sandY: number;

  sand:
  while (true) {
    sandX = 500;
    sandY = 0;
    while (true) {
      if (sandY >= abyssStart) {
        break sand;
      }
      if (!["o", "#"].includes(map.get(`${sandX},${sandY + 1}`)!)) {
        sandY += 1;
        continue;
      }
      if (!["o", "#"].includes(map.get(`${sandX - 1},${sandY + 1}`)!)) {
        sandX -= 1;
        sandY += 1;
        continue;
      }
      if (!["o", "#"].includes(map.get(`${sandX + 1},${sandY + 1}`)!)) {
        sandX += 1;
        sandY += 1;
        continue;
      }
      map.set(`${sandX},${sandY}`, "o");
      break;
    }
  }
  return Array.from(map.values()).filter((value) => value === "o").length;
}

export function print(input: Map<string, string>) {
  const coords = Array.from(input.keys()).map((coord) =>
    coord.split(",").map((item) => parseInt(item))
  );
  const xs = coords.map((coord) => coord[0]);
  const ys = coords.map((coord) => coord[1]);
  const minX = Math.min(...xs);
  const mayX = Math.max(...xs);
  const minY = Math.min(0, ...ys);
  const mayY = Math.max(...ys);
  for (let i = minY; i <= mayY; i++) {
    let line = "";
    for (let j = minX; j <= mayX; j++) {
      line += input.get(`${j},${i}`) ?? ".";
    }
    console.error(line);
  }
}
