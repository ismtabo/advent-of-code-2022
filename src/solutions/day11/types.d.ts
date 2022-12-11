export interface Operation {
  left: "old" | bigint;
  op: "+" | "*";
  right: "old" | bigint;
}

interface Test {
  module: bigint;
  true: string;
  false: string;
}

export interface Monkey {
  id: string;
  items: bigint[];
  operation: Operation;
  test: Test;
}

export type Input = Map<string, Monkey>;
