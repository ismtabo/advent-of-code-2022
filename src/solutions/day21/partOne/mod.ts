import { Input } from "../types.d.ts";

function calculateRegister(
  register: string,
  registers: Input,
  cache: Map<string, number> = new Map<string, number>(),
): number {
  if (cache.has(register)) {
    return cache.get(register)!;
  }
  const value = registers.get(register);
  if (value == null) {
    throw new Error(`missing value [register=${register}]`);
  }
  if (typeof value === "number") {
    cache.set(register, value);
    return value;
  }

  const left = calculateRegister(value.left, registers, cache);
  const right = calculateRegister(value.right, registers, cache);
  switch (value?.operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    default:
      throw new Error(
        `unknown operator ${value?.operator} [register=${register}]`,
      );
  }
}

export function partOne(input: Input) {
  return calculateRegister("root", input);
}
