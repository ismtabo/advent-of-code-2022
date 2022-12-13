import { Packet, SubPacket } from "../types.d.ts";

export function partOne(input: Packet[][]) {
  return input.map(([left, right]) => comparePackets(left, right)).reduce(
    (acc, result, i) => result < 0 ? acc + (i + 1) : acc,
    0 as number,
  );
}

export function comparePackets(left: Packet, right: Packet) {
  return compareBothArrays(left, right);
}

export function compareSubPackets(
  left: SubPacket,
  right: SubPacket,
): -1 | 0 | 1 {
  if (typeof left === "number" && typeof right === "number") {
    return compareBothNumbers(left, right);
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    return compareBothArrays(left, right);
  }
  if (Array.isArray(right)) {
    return compareBothArrays([left], right);
  }
  if (Array.isArray(left)) {
    return compareBothArrays(left, [right]);
  }
  throw new Error();
}

export function compareBothNumbers(left: number, right: number) {
  return left < right ? -1 : left === right ? 0 : 1;
}

export function compareBothArrays(
  left: Array<SubPacket>,
  right: Array<SubPacket>,
): -1 | 0 | 1 {
  while (left.length && right.length) {
    const leftPacket = left.shift()!;
    const rightPacket = right.shift()!;
    const result = compareSubPackets(leftPacket, rightPacket);
    if (result !== 0) {
      return result;
    }
  }
  if (left.length === 0 && right.length !== 0) {
    return -1;
  }
  if (right.length === 0 && left.length !== 0) {
    return 1;
  }
  return 0;
}
