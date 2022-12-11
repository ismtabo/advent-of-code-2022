import { Input, Operation, Test } from "../types.d.ts";
export function partOne(input: Input, rounds = 20, partTwo = false) {
  const inspections = new Map<string, number>(
    Array.from(input.keys()).map((key) => [key, 0]),
  );
  const lcm = calculateLCM(
    ...Array.from(input.values()).map((monkey) => monkey.test.module),
  );
  for (const _round of new Array(rounds).fill(null).map((_, i) => i)) {
    for (const [id, monkey] of input.entries()) {
      while (monkey.items.length) {
        inspections.set(id, inspections.get(id)! + 1);
        const item = monkey.items.shift()!;
        const worryLevel = partTwo
          ? evaluateOperation(monkey.operation, item) % lcm
          : evaluateOperation(monkey.operation, item) / 3n;
        const targetMonkey = evaluateTest(monkey.test, worryLevel);
        input.get(targetMonkey)?.items.push(worryLevel);
      }
    }
  }
  return Array.from(inspections.values()).sort((a, b) => b - a).slice(0, 2)
    .reduce(
      (a, b) => a * b,
      1,
    );
}

function evaluateOperation(operation: Operation, item: bigint) {
  const left = operation.left === "old" ? item : operation.left;
  const right = operation.right === "old" ? item : operation.right;
  if (operation.op === "+") {
    return left + right;
  }
  return left * right;
}

function evaluateTest(test: Test, worryLevel: bigint) {
  if (worryLevel % test.module === 0n) {
    return test.true;
  }
  return test.false;
}

const calculateLCM = (...arr: bigint[]) => {
  const gcd = (x: bigint, y: bigint): bigint => (!y ? x : gcd(y, x % y));
  const _lcm = (x: bigint, y: bigint) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};
