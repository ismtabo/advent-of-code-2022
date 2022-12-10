export function partOne(input: string[]) {
  return executeInstructions(input)
    .signals;
}

export function executeInstructions(instructions: string[]) {
  return instructions.flatMap((line) =>
    line.startsWith("addx") ? ["wait", line] : line
  )
    .reduce((state, ins, iter) => {
      const cycle = iter + 1;
      if (cycle >= 20 && cycle <= 220 && (cycle - 20) % 40 === 0) {
        state.signals += cycle * state.registers.x;
      }
      const currentPixel = iter % 40 + 1;
      if (
        state.registers.x <= currentPixel &&
        currentPixel < state.registers.x + 3
      ) {
        const x = iter % 40;
        const y = Math.floor(cycle / 40);
        state.screen.at(y)?.splice(x, 1, "#");
      }
      if (ins.startsWith("addx")) {
        const [_, value] = ins.split(" ", 2);
        state.registers.x += parseInt(value);
      }
      return state;
    }, {
      registers: { x: 1 },
      signals: 0,
      screen: new Array(6).fill(0).map(() => new Array(40).fill(".")),
    });
}
