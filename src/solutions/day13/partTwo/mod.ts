import { comparePackets } from "../partOne/mod.ts";
import { Packet } from "../types.d.ts";

export function partTwo(input: Packet[][]) {
  const sortedPackets = input.flat().concat([[[2]]], [[[6]]]).sort((a, b) =>
    comparePackets(deepClone(a), deepClone(b))
  );
  const firstDividerPacket = sortedPackets.findIndex((packet) =>
    JSON.stringify(packet) === JSON.stringify([[2]])
  );
  const secondDividerPacket = sortedPackets.findIndex((packet) =>
    JSON.stringify(packet) === JSON.stringify([[6]])
  );
  return (firstDividerPacket + 1) * (secondDividerPacket + 1);
}

const deepClone = (obj: any) => {
  if (obj === null) return null;
  let clone = { ...obj };
  Object.keys(clone).forEach(
    (
      key,
    ) => (clone[key] = typeof obj[key] === "object"
      ? deepClone(obj[key])
      : obj[key]),
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
};
