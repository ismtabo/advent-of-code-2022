import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Operation } from "./types.d.ts";

export function validate(text: string): boolean {
  return text.trim().split("\n\n").every((monkeyLines) => {
    const [
      infoLine,
      itemsLine,
      operationLine,
      testLine,
      testTrueLine,
      testFalseLine,
    ] = monkeyLines.trim().split("\n", 6);
    return /^Monkey \d+:$/.test(infoLine.trim()) &&
      /^Starting items: \d+(, \d+)*$/.test(itemsLine.trim()) &&
      /^Operation: new = (old|\d+) [+*] (old|\d+)$/.test(
        operationLine.trim(),
      ) &&
      /^Test: divisible by \d+$/.test(testLine.trim()) &&
      /^If true: throw to monkey \d+$/.test(testTrueLine.trim()) &&
      /^If false: throw to monkey \d+$/.test(testFalseLine.trim());
  });
}

export function preprocess(text: string) {
  return new Map(
    text.trim().split("\n\n").map((monkeyLines) => {
      const [
        infoLine,
        itemsLine,
        operationLine,
        testLine,
        testTrueLine,
        testFalseLine,
      ] = monkeyLines.trim().split("\n", 6);
      const id = infoLine.match(/Monkey (?<id>\d+):/)?.groups?.id!;
      const items = itemsLine.split(": ", 2).at(-1)?.split(" ").map((item) =>
        BigInt(parseInt(item))
      )!;
      const operation = operationLine.match(
        /new = (?<left>old|\d+) (?<op>[+*]) (?<right>old|\d+)/,
      )?.groups!;
      const test = BigInt(
        testLine.match(/divisible by (?<number>\d+)/)?.groups?.number!,
      );
      const trueBranch = testTrueLine.match(/throw to monkey (?<id>\d+)/)
        ?.groups
        ?.id!;
      const falseBranch = testFalseLine.match(/throw to monkey (?<id>\d+)/)
        ?.groups
        ?.id!;
      return [id, {
        id,
        items,
        operation: {
          op: operation.op,
          left: /old/.test(operation.left) ? "old" : BigInt(operation.left),
          right: /old/.test(operation.right) ? "old" : BigInt(operation.right),
        } as Operation,
        test: { module: test, true: trueBranch, false: falseBranch },
      }];
    }),
  );
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
