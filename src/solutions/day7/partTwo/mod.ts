import {
  calculateDirectorySize,
  evaluateCommand,
  isDirectory,
  walkDir,
} from "../partOne/mod.ts";
import { Directory } from "../types.d.ts";

export function partTwo(input: string[]) {
  const root: Directory = {
    parent: undefined,
    name: "/",
    path: "",
    children: {},
  };
  let dir = root;
  while (input.length > 0) {
    ({ commands: input, dir } = evaluateCommand(input, dir));
  }
  const sizes = new Map<string, bigint>();
  walkDir(root, (path) => {
    if (!isDirectory(path)) {
      return;
    }
    const size = calculateDirectorySize(path);
    sizes.set(path.path, size);
  });
  const currentUsage = calculateDirectorySize(root);
  const requireSpace = 70_000_000n - 30_000_000n;
  const possibleDeletes = Array.from(sizes.values()).filter((value) =>
    currentUsage - value <= requireSpace
  );
  return possibleDeletes.reduce(
    (a, b) => a < b ? a : b,
    BigInt(Number.MAX_SAFE_INTEGER),
  );
}
