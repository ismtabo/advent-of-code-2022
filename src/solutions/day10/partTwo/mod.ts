import { executeInstructions } from "../partOne/mod.ts";

export function partTwo(input: string[]) {
  return executeInstructions(input).screen.map((line) => line.join("")).join(
    "\n",
  );
}
