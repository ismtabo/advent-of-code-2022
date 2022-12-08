export function partTwo(input: number[][]) {
  const values = input.flat().map((height, position) => {
    const x = Math.floor(position % input[0].length);
    const y = Math.floor(position / input[0].length);
    if (
      x === 0 || x === input[0].length - 1 || y === 0 || y === input.length - 1
    ) {
      return -Infinity;
    }
    const up = lookUp(y, input, x, height);
    const left = lookLeft(x, y, input, height);
    const right = lookRight(x, input, y, height);
    const down = lookDown(y, input, x, height);
    const visibility = left * right * up * down;
    return visibility;
  });
  return Math.max(...values);
}

function lookUp(y: number, input: number[][], x: number, height: number) {
  if (y === 0) {
    return 1;
  }
  let closesTaller = input.slice(0, y).reverse().findIndex((row) =>
    row.at(x)! >= height
  );
  if (closesTaller === -1) {
    closesTaller = y - 1;
  }
  return closesTaller + 1;
}

function lookLeft(x: number, y: number, input: number[][], height: number) {
  if (x === 0) {
    return 1;
  }
  let closestTaller = input.at(y)!.slice(0, x).reverse().findIndex((other) =>
    other >= height
  );
  if (closestTaller === -1) {
    closestTaller = x - 1;
  }
  return closestTaller + 1;
}

function lookRight(x: number, input: number[][], y: number, height: number) {
  if (x === input[0].length - 1) {
    return 1;
  }
  let closestTaller = input.at(y)!.slice(x + 1).findIndex((other) =>
    other >= height
  );
  if (closestTaller === -1) {
    closestTaller = input[0].length - x - 2;
  }
  return closestTaller + 1;
}

function lookDown(y: number, input: number[][], x: number, height: number) {
  if (y === input.length - 1) {
    return 1;
  }
  let closesTaller = input.slice(y + 1).findIndex((row) =>
    row.at(x)! >= height
  );
  if (closesTaller === -1) {
    closesTaller = input.length - y - 2;
  }
  return closesTaller + 1;
}
