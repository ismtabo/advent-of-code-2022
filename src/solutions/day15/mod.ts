import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function validate(text: string): boolean {
  return false;
}

export function preprocess(text: string) {
  return text.trim().split("\n").map((line) => {
    const [sensorInfo, beaconInfo] = line.trim().split(":", 2);
    const { x: sensorX, y: sensorY } = sensorInfo.match(
      /x=(?<x>-?\d+), y=(?<y>-?\d+)/,
    )?.groups as any;
    const { x: beaconX, y: beaconY } = beaconInfo.match(
      /x=(?<x>-?\d+), y=(?<y>-?\d+)/,
    )?.groups as any;
    return {
      sensor: {
        x: parseInt(sensorX),
        y: parseInt(sensorY),
      },
      beacon: {
        x: parseInt(beaconX),
        y: parseInt(beaconY),
      },
    };
  });
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
