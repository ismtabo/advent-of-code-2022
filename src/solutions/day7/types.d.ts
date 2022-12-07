export interface File {
  name: string;
  path: string;
  size: bigint;
}

export interface Directory {
  parent: Directory | undefined;
  name: string;
  path: string;
  children: Record<string, File | Directory>;
}
