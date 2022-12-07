import { Directory, File } from "../types.d.ts";

function navigateRoot(dir: Directory) {
  while (dir.parent != null) {
    dir = dir.parent;
  }
  return dir!;
}

function navigateParent(dir: Directory) {
  return dir.parent;
}

function navigateRelative(dir: Directory, path: string) {
  const segments = path.split("/");
  segments.forEach((segment) => {
    if (!(segment in dir.children)) {
      dir.children[segment] = {
        name: segment,
        path: `${dir.path}/${segment}`,
        children: {},
        parent: dir,
      };
    }
    dir = dir.children[segment] as Directory;
  });
  return dir;
}

function evaluateCd(command: string, commands: string[], dir: Directory) {
  const path = command.slice(5);
  if (path.startsWith("/")) {
    dir = navigateRoot(dir);
  } else if (path === "..") {
    dir = navigateParent(dir)!;
  } else {
    dir = navigateRelative(dir, path);
  }
  return { commands, dir };
}

function evaluateLs(commands: string[], dir: Directory) {
  while (commands.length > 0 && !commands.at(0)?.startsWith("$")) {
    const [info, name] = commands.shift()!.split(" ");
    if (info === "dir") {
      dir.children[name] = {
        name,
        path: `${dir.path}/${name}`,
        children: {},
        parent: dir,
      } as Directory;
    } else {
      dir.children[name] = {
        name,
        path: `${dir.path}/${name}`,
        size: BigInt(info),
      } as File;
    }
  }
  return { commands, dir };
}

export function evaluateCommand(commands: string[], tree: Directory) {
  const command = commands.shift()!;
  switch (true) {
    case command.slice(2).startsWith("cd"):
      return evaluateCd(command, commands, tree);
    case command.slice(2).startsWith("ls"):
      return evaluateLs(commands, tree);
    default:
      throw new Error(`unknown command: ${command}`);
  }
}

export function isDirectory(
  dirOrFile: Directory | File,
): dirOrFile is Directory {
  return "children" in dirOrFile;
}

export function walkDir(
  dir: Directory,
  callback: (dir: Directory | File) => void,
) {
  Object.values(dir.children).forEach((path) => {
    callback(path);
    if (isDirectory(path)) {
      walkDir(path, callback);
    }
  });
}

export function calculateDirectorySize(
  dir: Directory,
  cache = new Map<string, bigint>(),
) {
  let sum = 0n;
  if (cache.has(dir.name)) {
    return cache.get(dir.name)!;
  }
  Object.values(dir.children).forEach((path) => {
    if (isDirectory(path)) {
      sum += calculateDirectorySize(path, cache);
    } else {
      sum += path.size;
    }
  });
  return sum;
}

export function partOne(input: string[]) {
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
  return Array.from(sizes.values()).filter((value) => value <= 100_000n).reduce(
    (a, b) => a + b,
    0n,
  );
}
